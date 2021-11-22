import { useState } from "react";
import styled from "styled-components";

import InstrumentSampleContainer from "../../components/Main/InstrumentSampleContainer";
import SequencerContainer from "../../components/Main/SequencerContainer";
import Player from "../../components/Main/Player";
import Header from "../../components/common/Header";

export default function MainPage({ history }) {
  const [time, setTime] = useState();
  const [nowPlayingSample, setNowPlayingSample] = useState([]);

  return (
    <StyledMainPage>
      <Header>/</Header>
      <Border>
        <InstrumentSampleContainer
          history={history}
          nowPlayingSample={nowPlayingSample}
          setNowPlayingSample={setNowPlayingSample}
        />
        <SequencerContainer
          setTime={setTime}
        />
        <Player
          time={time}
          nowPlayingSample={nowPlayingSample}
          setNowPlayingSample={setNowPlayingSample}
        />
      </Border>
    </StyledMainPage>
  );
}

const StyledMainPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e0d2c4;
`;

const Border = styled.div`
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 50px 15px #F0F0F0;
`;
