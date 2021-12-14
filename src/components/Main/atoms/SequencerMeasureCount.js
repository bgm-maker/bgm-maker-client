import styled from "styled-components";

export default function SequencerMeasureCount({ children }) {

  return (
    <StyledMeasureCount>{children}</StyledMeasureCount>
  );
};

const StyledMeasureCount = styled.div`
  position: absolute;
  margin-left: 8px;
  word-break: break-all;
  word-wrap: break-word;
`;
