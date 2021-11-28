import styled from "styled-components";

import InstrumentSampleZone from "../../components/Main/organisms/InstrumentSampleZone";
import SequencerDropZone from "../../components/Main/organisms/SequencerDropZone";
import PlayerZone from "../../components/Main/organisms/PlayerZone";
import Header from "../../components/common/atoms/Header";

export default function MainPage() {

  return (
    <StyledMainPage>
      <Header>/</Header>
      <StyledMainBorder>
        <InstrumentSampleZone />
        <SequencerDropZone />
        <PlayerZone />
      </StyledMainBorder>
    </StyledMainPage>
  );
}

const StyledMainPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e0d2c4;
`;

const StyledMainBorder = styled.div`
  margin: 10px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 50px 15px #F0F0F0;
`;
