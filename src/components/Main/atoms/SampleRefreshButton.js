import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FcRefresh } from "react-icons/fc";

import { SampleContext } from "../molecules/SampleGroup";
import {
  refreshInstrument,
  selectedRandomNum,
  selectedMood,
} from "../../../feature/instrumentSlice";
import reselectRandomInstrument from "../../../util/reselectRandomInstrument";

export default function SampleRefreshButton() {
  const { instType, sample, order } = useContext(SampleContext);
  const selectedRandomNums = useSelector(selectedRandomNum);
  const selectedCurrentMood = useSelector(selectedMood);
  const dispatch = useDispatch();

  const handleRefreshSample = () => {
    const sampleInfo = {
      instType,
      selectedRandomNums,
      selectedCurrentMood,
    };
    const reselectedNums = reselectRandomInstrument(sampleInfo);
    dispatch(refreshInstrument({ reselectedNums, instType, sample }));
  };

  return (
    <StyledRefreshButton onClick={handleRefreshSample}>
      <FcRefresh />
    </StyledRefreshButton>
  );
};

const StyledRefreshButton = styled.div`
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
