import styled from "styled-components";

export default function SampleTypeText({ children }) {
  return (
    <StyledSampleType>{children}</StyledSampleType>
  );
};

const StyledSampleType = styled.div`
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
