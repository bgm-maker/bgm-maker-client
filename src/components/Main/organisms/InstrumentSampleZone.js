import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectInstrumentSamples, selectEditedSamples } from "../../../feature/instrumentSlice";
import SampleGroup from "../molecules/SampleGroup";
import SampleTypeText from "../atoms/SampleTypeText";

export default function InstrumentSampleZone() {
  const instrumentSamples = useSelector(selectInstrumentSamples);
  const editedSamples = useSelector(selectEditedSamples);

  return (
    <div>
      {Object.entries(instrumentSamples).map((item) => {
        const [instType, samples] = item;

        return (
          <StyledSampleRowLine>
            <SampleTypeText>{instType}</SampleTypeText>
            <StyledSampleWrapper>
              <SampleGroup instType={instType} sample={samples[0]} order={0}>
                <SampleGroup.SampleDiv />
                <SampleGroup.SampleRefreshButton />
              </SampleGroup>

              <SampleGroup instType={instType} sample={samples[1]} order={1}>
                <SampleGroup.SampleDiv />
                <SampleGroup.SampleRefreshButton />
              </SampleGroup>

              <SampleGroup instType={instType} sample={samples[2]} order={2}>
                <SampleGroup.SampleDiv />
                <SampleGroup.SampleRefreshButton />
              </SampleGroup>

              <SampleGroup instType={instType} sample={samples[3]} order={3}>
                <SampleGroup.SampleDiv />
                <SampleGroup.SampleRefreshButton />
              </SampleGroup>

              <SampleGroup instType={instType} sample={samples[4]} order={4}>
                <SampleGroup.SampleDiv />
                <SampleGroup.SampleRefreshButton />
              </SampleGroup>
            </StyledSampleWrapper>
          </StyledSampleRowLine>
        );
      })}
      <StyledSampleRowLine>
        <SampleTypeText>Edited Sample</SampleTypeText>
        <StyledSampleWrapper>
          {editedSamples.map((item, index) => (
            <SampleGroup instType="editedSample" sample={item} order={index}>
              <SampleGroup.SampleDiv />
            </SampleGroup>
          ))}
        </StyledSampleWrapper>
      </StyledSampleRowLine>
    </div>
  );
};

const StyledSampleRowLine = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const StyledSampleWrapper = styled.div`
  display: flex;
  position: relative;
  left: 2vw;
  width: 80vw;
`;
