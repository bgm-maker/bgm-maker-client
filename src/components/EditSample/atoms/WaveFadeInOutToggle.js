import styled from "styled-components";

export default function WaveFadeInOutToggle(props) {

  return (
    <div>
      <p>{props.name}</p>
      <StyledSliderBox>
        <StyledFadeInOutToggle {...props} />
        <ToggleSlider></ToggleSlider>
      </StyledSliderBox>
    </div>
  );
}

const StyledSliderBox = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 30px;
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
    height: 23px;
    width: 23px;
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
    -webkit-transform: translateX(36px);
    -ms-transform: translateX(36px);
    transform: translateX(36px);
  }
`;
