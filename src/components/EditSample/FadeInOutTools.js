import styled from "styled-components";

export default function FadeInOutTools({ waveHandler }) {

  function handleFadeIn() {
    waveHandler.toggleFadeIn();
  }

  function handleFadeOut() {
    waveHandler.toggleFadeOut();
  }

  return (
    <FadeInOutToggleWrapper>
      <div>
        <p>Fade In</p>
        <SliderBox>
          <FadeInOutToggle type="checkbox" onClick={handleFadeIn} />
          <ToggleSlider></ToggleSlider>
        </SliderBox>
      </div>
      <div>
        <p>Fade Out</p>
        <SliderBox>
          <FadeInOutToggle type="checkbox" onClick={handleFadeOut} />
          <ToggleSlider></ToggleSlider>
        </SliderBox>
      </div>
    </FadeInOutToggleWrapper>
  );
}

const FadeInOutToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;
const SliderBox = styled.label`
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

const FadeInOutToggle = styled.input`
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
