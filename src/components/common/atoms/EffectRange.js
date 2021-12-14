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
      return "4vh";
    }
    return "2vh";
  }};
  width: ${(props) => {
    if (props.wave) {
      return "17vw";
    }
    return "11vw";
  }};
  border-radius: 12px;
  background-color: #93B5C6;
  background: white;
  box-shadow: 1px 1px 1px #C9CCD5, 0px 0px 1px #93B5C6;
  cursor: pointer;
  -webkit-appearance: none;
`;

const StyledText = styled.p`
  font-size: ${(props) => {
    if (props.wave) {
      return "1.3vw";
    }
    return "1vw";
  }};
`;
