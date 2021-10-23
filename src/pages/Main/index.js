import { useState } from "react";
import styled from "styled-components";

import InstrumentSampleBox from "../../components/Main/InstrumentSampleBox";
import SequencerBox from "../../components/Main/SequencerBox";
import Player from "../../components/Main/Player";
import Header from "../../components/common/Header";

export default function MainPage({ history }) {
  const [time, setTime] = useState();
  const [nowPlayingSample, setNowPlayingSample] = useState([]);

  return (
    <StyledMainPage>
      <Header>/</Header>
      <Border>
        <InstrumentSampleBox
          history={history}
          nowPlayingSample={nowPlayingSample}
          setNowPlayingSample={setNowPlayingSample}
        />
        <SequencerBox
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
