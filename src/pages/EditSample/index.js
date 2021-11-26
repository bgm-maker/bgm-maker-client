import { useState } from "react";
import styled from "styled-components";

import SampleWaveFormContainer from "../../components/EditSample/SampleWaveFormContainer";
import SampleWaveEditContainer from "../../components/EditSample/SampleWaveEditContainer";
import Header from "../../components/common/Header";

export default function EditSamplePage({ history }) {
  const [waveHandler, setWaveHandler] = useState(null);
  const sampleUrl = history.location.state;

  return (
    <StyledEditSamplePage>
      <Header>/main</Header>
      <SampleWaveFormContainer waveHandler={waveHandler} setWaveHandler={setWaveHandler} sampleUrl={sampleUrl} />
      <SampleWaveEditContainer waveHandler={waveHandler} />
    </StyledEditSamplePage>
  );
}

const StyledEditSamplePage = styled.div`
  height: 100vh;
  display: flex;
  background-color: #e0d2c4;
`;
