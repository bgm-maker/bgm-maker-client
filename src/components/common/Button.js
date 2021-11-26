import styled, { css, keyframes } from "styled-components";

export default function Button(props) {

  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  );
}

function blinkingEffect() {
  return keyframes`
    50% {
      opacity: 0.5;
    }
  `;
}

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height:40px;
  margin: 0 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #E6E6E6;
  border-radius: 4px;
  background-color: #e0d2c4;
  color: ${(props) => {
    if (props.record) {
      return "red";
    }
  }};
  font-size: 23px;
  box-shadow: 1.5px 1.5px 4px 1px #9E846B;
  &:hover {
    ${(props) => {
    if (props.isRecording && props.record) {
      return css`filter: brightness(105%)`;
    }
    if (!props.isRecording) {
      return css`filter: brightness(105%)`;
    }
  }}}

  ${(props) => {
    if (props.isRecording && props.record) {
      return css`animation: ${blinkingEffect} 1s linear infinite`;
    }
    if (props.isRecording) {
      return css`filter: brightness(60%)`;
    }
  }};
`;
