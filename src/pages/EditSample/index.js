import { useState } from "react";
import styled from "styled-components";

import WaveEditZone from "../../components/EditSample/organisms/WaveEditZone";
import WaveFormZone from "../../components/EditSample/organisms/WaveFormZone";
import Header from "../../components/common/atoms/Header";

export default function EditSamplePage({ history }) {
  const [waveHandler, setWaveHandler] = useState(null);
  const sampleUrl = history.location.state;

  return (
    <StyledEditSamplePage>
      <Header>/main</Header>
      <StyledWaveZone>
        <WaveFormZone setWaveHandler={setWaveHandler} sampleUrl={sampleUrl} />
        <WaveEditZone waveHandler={waveHandler} />
      </StyledWaveZone>
    </StyledEditSamplePage>
  );
}

const StyledEditSamplePage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e0d2c4;
`;

const StyledWaveZone = styled.div`
  display: flex;
`;
