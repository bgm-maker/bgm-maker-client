import styled from "styled-components";

export default function SampleTypeText({ children }) {

  return (
    <StyledSampleType>{children}</StyledSampleType>
  );
};

const StyledSampleType = styled.div`
  display: flex;
  width: 10vw;
  height: 1vh;
  margin-top: 7px;
  margin-right: 10px;
  padding-top: 0.5vw;
  justify-content: center;
  font-size: 1.2vw;
  font-weight: lighter;
  font-family: lato;
`;
