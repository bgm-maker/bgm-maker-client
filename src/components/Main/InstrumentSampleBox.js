import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcRefresh } from "react-icons/fc";
import styled from "styled-components";

import InstrumentSampleSource from "./InstrumentSampleSource";
import reselectRandomInstrument from "../../util/reselectRandomInstrument";
import {
  selectInstrument,
  selectEditedWaveSample,
  selectedRandomNum,
  refreshInstrument
} from "../../feature/instrumentSlice";

export default function InstrumentSampleBox({ history, nowPlayingSample, setNowPlayingSample }) {
  const instrument = useSelector(selectInstrument);
  const editedSamples = useSelector(selectEditedWaveSample);
  const selectedRandomNums = useSelector(selectedRandomNum);
  const [myPresetList, setMyPresetList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setMyPresetList(editedSamples);
  }, []);

  function handleRefresh(param) {
    const { instType } = param;

    try {
      const reselectedNums = reselectRandomInstrument(param, selectedRandomNums);
      dispatch(refreshInstrument({ reselectedNums, instType }));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      {Object.entries(instrument).map((inst, index) => {
        const [instType, samples] = inst;

        return (
          <SampleWrapper key={index}>
            <SampleType>{inst[0]}</SampleType>
            <Sample>
              <InstrumentSampleSource
                sample={samples[0]}
                instType={instType}
                history={history}
                order={1}
                nowPlayingSample={nowPlayingSample}
                setNowPlayingSample={setNowPlayingSample} />
              <Refresh
                onClick={() => { handleRefresh({ instType, samples, currentSample: samples[0] }) }}>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource
                sample={samples[1]}
                instType={instType}
                history={history}
                order={2}
                nowPlayingSample={nowPlayingSample}
                setNowPlayingSample={setNowPlayingSample} />
              <Refresh
                onClick={() => { handleRefresh({ instType, samples, currentSample: samples[1] }) }}>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource
                sample={samples[2]}
                instType={instType}
                history={history}
                order={3}
                nowPlayingSample={nowPlayingSample}
                setNowPlayingSample={setNowPlayingSample} />
              <Refresh
                onClick={() => { handleRefresh({ instType, samples, currentSample: samples[2] }) }}>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource
                sample={samples[3]}
                instType={instType}
                history={history}
                order={4}
                nowPlayingSample={nowPlayingSample}
                setNowPlayingSample={setNowPlayingSample} />
              <Refresh
                onClick={() => { handleRefresh({ instType, samples, currentSample: samples[3] }) }}>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource
                sample={samples[4]}
                instType={instType}
                history={history} order={5}
                nowPlayingSample={nowPlayingSample}
                setNowPlayingSample={setNowPlayingSample} />
              <Refresh onClick={() => { handleRefresh({ instType, samples, currentSample: samples[4] }) }}>
                <FcRefresh />
              </Refresh>
            </Sample>
          </SampleWrapper>
        )
      }
      )}
      <EditedSampleWrapper>
        <SampleType>Edited Sample</SampleType>
        {myPresetList.map((sample) =>
          <Sample>
            <InstrumentSampleSource
              sample={sample}
              history={history}
              nowPlayingSample={nowPlayingSample}
              setNowPlayingSample={setNowPlayingSample} />
          </Sample>
        )}
      </EditedSampleWrapper>
    </div>
  );
}

const SampleWrapper = styled.div`
  display: flex;
`;

const SampleType = styled.div`
  display: flex;
  width: 120px;
  height: 40px;
  margin-top: 7px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: lighter;
  font-family: lato;
`;

const Sample = styled.div`
  margin: 5px 35px;
`;

const Refresh = styled.div`
  height: 18px;
  width: 18px;
  margin-left: 1px;
  border-style: none solid solid solid;
  border-width: 0.3px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-color: #E5E5E5;

  &:hover {
    background-color: #EBEBEB;
  }
`;

const EditedSampleWrapper = styled.div`
  display: flex;
`;
