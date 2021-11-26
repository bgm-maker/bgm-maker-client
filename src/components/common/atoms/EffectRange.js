import styled from "styled-components";

export default function EffectRange(props) {

  return (
    <div>
      <StyledText {...props} >{props.name}</StyledText>
      <StyledRange {...props} />
    </div>
  );
};

const StyledRange = styled.input`
  height: ${(props) => {
    if (props.wave) {
      return "25px";
    }
    return "14px";
  }};
  width: ${(props) => {
    if (props.wave) {
      return "190px";
    }
    return "125px";
  }};
  border-radius: 12px;
  background-color: #93B5C6;
  background: white;
  box-shadow: 1px 1px 1px #C9CCD5, 0px 0px 1px #93B5C6;
  cursor: pointer;
  -webkit-appearance: none;
`;

const StyledText = styled.p`
  margin-top: 5px;
  font-size: ${(props) => {
    if (props.wave) {
      return "15px";
    }
    return "11px";
  }};
`;
