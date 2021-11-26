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
      <WaveFormZone setWaveHandler={setWaveHandler} sampleUrl={sampleUrl} />
      <WaveEditZone waveHandler={waveHandler} />
    </StyledEditSamplePage>
  );
}

const StyledEditSamplePage = styled.div`
  height: 100vh;
  display: flex;
  background-color: #e0d2c4;
`;
