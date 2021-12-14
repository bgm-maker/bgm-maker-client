import styled from "styled-components";

export default function WaveFadeInOutToggle(props) {

  return (
    <div>
      <StyledText>{props.name}</StyledText>
      <StyledSliderBox>
        <StyledFadeInOutToggle {...props} />
        <ToggleSlider></ToggleSlider>
      </StyledSliderBox>
    </div>
  );
}

const StyledText = styled.p`
  font-size: 1.3vw;
`;

const StyledSliderBox = styled.label`
  position: relative;
  display: inline-block;
  width: 6vw;
  height: 5vh;
  vertical-align: middle;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 3.7vh;
    width: 2vw;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
`;

const StyledFadeInOutToggle = styled.input`
  display: none;

  &:checked {
    background-color: black;
    ${ToggleSlider}
  }

  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(5.5vh);
    -ms-transform: translateX(5.5vh);
    transform: translateX(5.5vh);
  }
`;
