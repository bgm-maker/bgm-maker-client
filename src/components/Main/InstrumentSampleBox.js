import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FcRefresh } from "react-icons/fc";
import styled from "styled-components";

import InstrumentSampleSource from "./InstrumentSampleSource";
import { selectInstrument, selectEditedWaveSample } from "../../feature/instrumentSlice";

export default function InstrumentSampleBox({ history }) {
  const instrument = useSelector(selectInstrument);
  const editedSamples = useSelector(selectEditedWaveSample);
  const [myPresetList, setMyPresetList] = useState([]);

  useEffect(() => {
    setMyPresetList(editedSamples);
  }, []);

  return (
    <div>
      {Object.entries(instrument).map((inst, index) => {
        return (
          <SampleWrapper key={index}>
            <SampleType>{inst[0]}</SampleType>
            <Sample>
              <InstrumentSampleSource sample={inst} history={history} />
              <Refresh>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource sample={inst} history={history} />
              <Refresh>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource sample={inst} history={history} />
              <Refresh>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource sample={inst} history={history} />
              <Refresh>
                <FcRefresh />
              </Refresh>
            </Sample>
            <Sample>
              <InstrumentSampleSource sample={inst} history={history} />
              <Refresh>
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
            <InstrumentSampleSource sample={sample} history={history} />
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
