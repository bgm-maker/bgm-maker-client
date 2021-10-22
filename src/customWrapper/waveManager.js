export default function CreateWaveManager(waveSurfer, waveSurferPlugins, toneJs, defaultOptions, utils) {
  const { TimelinePlugin, RegionsPlugin } = waveSurferPlugins;
  const { cutWaveUtil } = utils;
  const waveSurferSampleList = [];
  const toneJsSampleList = [];
  let sampleUrl = "";
  let currentStopTime = 0;
  let waveSurferSample = {};
  let toneJsSample = {};
  let currentBuffer = {};
  let region = {};
  let fadeIn = {};
  let fadeOut = {};
  let effects = {};

  function defaultEventSet() {
    waveSurferSample.on("ready", () => {
      currentBuffer = waveSurferSample.backend.buffer;
      waveSurferSampleList.push(currentBuffer);
    });

    waveSurferSample.on("region-update-end", (region) => {
      if (fadeIn.id === region.id) {
        toneJsSample.fadeIn = region.start;
        return;
      }

      if (fadeOut.id === region.id) {
        toneJsSample.fadeOut = region.start;
        return;
      }
    });
  }

  function connectEffects() {
    if (Object.keys(effects).length === 0) {
      toneJsSample.toDestination();
      return;
    }

    const effectList = Object.values(effects);
    toneJsSample.fan(...effectList);
  }

  function disconnectEffects() {
    if (Object.keys(effects).length === 0) {
      toneJsSample.toDestination();
      return;
    }

    for (const type in effects) {
      toneJsSample.disconnect(effects[type]);
    }
  }

  const waveHandler = {
    load(url) {
      defaultEventSet();

      waveSurferSample.load(url);
      toneJsSample = new toneJs.Player(url).toDestination();
      toneJsSampleList.push(toneJsSample);
      sampleUrl = url;
    },
    addSingleRegion(options = defaultOptions.region) {
      if (Object.keys(region).length !== 0) return;

      const position = waveSurferSample.getDuration() / 2;
      Object.assign(options, { start: position });
      region = waveSurferSample.addRegion(options);
    },
    removeRegion() {
      if (Object.keys(region).length !== 0) return;

      region.remove();
      region = undefined;
    },
    cutWave(start, end) {
      if (!start && !end) return;

      if (region) {
        region.remove();
        region = {};
      }

      try {
        const { cutSelectionBuffer } = cutWaveUtil({ start, end }, waveSurferSample);
        toneJsSample = new toneJs.Player(cutSelectionBuffer).toDestination();
        toneJsSampleList.push(toneJsSample);
        waveSurferSampleList.push(cutSelectionBuffer);
        waveSurferSample.backend.buffer = cutSelectionBuffer;
        currentBuffer = cutSelectionBuffer;
        waveSurferSample.drawBuffer();

        connectEffects();

        return cutSelectionBuffer;
      } catch (err) {
        alert("영역을 다시 선택해주세요");
        this.removeRegion();
      }
    },
    rewindWave() {
      const currentBufferIndex = waveSurferSampleList.indexOf(currentBuffer);

      if (currentBufferIndex === 0) return;

      const prevBuffer = waveSurferSampleList[currentBufferIndex - 1];
      const prevToneJsSample = toneJsSampleList[currentBufferIndex - 1];
      currentBuffer = prevBuffer;
      waveSurferSample.backend.buffer = prevBuffer;
      toneJsSample = prevToneJsSample;
      waveSurferSample.drawBuffer();

      connectEffects();
    },
    forwardWave() {
      const currentBufferIndex = waveSurferSampleList.indexOf(currentBuffer);

      if (currentBufferIndex === waveSurferSampleList.length - 1) return;

      const forwardBuffer = waveSurferSampleList[currentBufferIndex + 1];
      const forwardToneJsSample = toneJsSampleList[currentBufferIndex + 1];
      currentBuffer = forwardBuffer;
      waveSurferSample.backend.buffer = forwardBuffer;
      toneJsSample = forwardToneJsSample;
      waveSurferSample.drawBuffer();

      connectEffects();
    },
    play() {
      const currentCursorTime = waveSurferSample.getCurrentTime();
      let startTime;

      if (currentStopTime !== currentCursorTime) {
        startTime = currentCursorTime;
      } else {
        startTime = currentStopTime;
      }

      waveSurferSample.setVolume(0);
      waveSurferSample.play();
      toneJsSample.start(0, startTime);
    },
    pause() {
      currentStopTime = waveSurferSample.getCurrentTime();
      waveSurferSample.pause();
      toneJsSample.stop();
    },
    stop() {
      currentStopTime = 0;
      toneJsSample.stop();
      waveSurferSample.stop();
    },
    toggleFadeIn() {
      if (Object.keys(fadeIn).length === 0) {
        const position = waveSurferSample.getDuration() / 2;
        fadeIn = waveSurferSample.addRegion({ ...defaultOptions.fadeIn, start: position });
      } else {
        toneJsSample.fadeIn = null;
        fadeIn.remove();
        fadeIn = {};
      }
    },
    toggleFadeOut() {
      if (Object.keys(fadeOut).length === 0) {
        const position = waveSurferSample.getDuration() / 2;
        fadeOut = waveSurferSample.addRegion({ ...defaultOptions.fadeOut, start: position });
      } else {
        toneJsSample.fadeOut = null;
        fadeOut.remove();
        fadeOut = {};
      }
    },
    setEffects(params) {
      for (const type in params) {
        let value = Number(params[type]);

        if (type === "volume") {
          toneJsSample.volume.value = value;
        }

        if (type === "biquad") {
          if (value === 0) {
            disconnectEffects(type);
            delete effects[type];
            connectEffects();
            return;
          }

          const frequency = 350 - value * 10;
          const biquadFilter = new toneJs.BiquadFilter().toDestination();
          biquadFilter.set({ Q: value, frequency, type: "lowpass" });
          disconnectEffects();
          effects[type] = biquadFilter;
          connectEffects();
        }

        if (type === "compressor") {
          value = (value - value) - (value + 30)

          if (value === 0) {
            disconnectEffects(type);
            delete effects[type];
            connectEffects();
            return;
          }

          const compressor = new toneJs.Compressor(value, 3).toDestination();
          disconnectEffects();
          effects[type] = compressor;
          connectEffects();
        }
      }
    },
    get getWave() {
      return toneJsSample;
    },
    get getRegion() {
      return region;
    },
    get getUrl() {
      return sampleUrl;
    }
  };

  return {
    create(options, plugins = []) {
      if (!options.container) {
        throw new Error("container property is required");
      }

      Object.assign(options, defaultOptions.create);

      if (plugins.length !== 0) {
        options.plugins = [];

        plugins.forEach((plugin) => {
          if (plugin.type === "TimelinePlugin") {
            if (!plugin.options.container) {
              throw new Error("container property is required");
            }

            options.plugins.push(TimelinePlugin.create(plugin.options));
          }
          if (plugin.type === "RegionsPlugin") {
            options.plugins.push(RegionsPlugin.create(plugin.options));
          }
        });
      }

      waveSurferSample = waveSurfer.create(options);
      return waveHandler;
    },
  };
}
