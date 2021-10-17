export default function cutWaveUtil(params, instance) {
  const start = params.start;
  const end = params.end;

  const originalAudioBuffer = instance.backend.buffer;

  const lengthInSamples = Math.floor((end - start) * originalAudioBuffer.sampleRate);
  if (!window.OfflineAudioContext) {
    if (!window.webkitOfflineAudioContext) {
      alert('webkit context not found')
    }
    window.OfflineAudioContext = window.webkitOfflineAudioContext;
  }
  const offlineAudioContext = instance.backend.ac

  const emptySegment = offlineAudioContext.createBuffer(
    originalAudioBuffer.numberOfChannels,
    lengthInSamples,
    originalAudioBuffer.sampleRate);

  const newAudioBuffer = offlineAudioContext.createBuffer(
    originalAudioBuffer.numberOfChannels,
    (start === 0 ? (originalAudioBuffer.length - emptySegment.length) : originalAudioBuffer.length),
    originalAudioBuffer.sampleRate);

  for (let channel = 0; channel < originalAudioBuffer.numberOfChannels; channel++) {

    const new_channel_data = newAudioBuffer.getChannelData(channel);
    const empty_segment_data = emptySegment.getChannelData(channel);
    const original_channel_data = originalAudioBuffer.getChannelData(channel);

    const before_data = original_channel_data.subarray(0, start * originalAudioBuffer.sampleRate);
    const mid_data = original_channel_data.subarray(start * originalAudioBuffer.sampleRate, end * originalAudioBuffer.sampleRate);
    const after_data = original_channel_data.subarray(Math.floor(end * originalAudioBuffer.sampleRate), (originalAudioBuffer.length * originalAudioBuffer.sampleRate));

    empty_segment_data.set(mid_data);

    if (start > 0) {
      new_channel_data.set(before_data);
      new_channel_data.set(after_data, (start * newAudioBuffer.sampleRate));
    } else {
      new_channel_data.set(after_data);
    }
  }
  return {
    newAudioBuffer,
    cutSelectionBuffer: emptySegment
  };
}
