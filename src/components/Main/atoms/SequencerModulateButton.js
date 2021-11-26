import styled from "styled-components";

import { MODULATE_BUTTON_TYPE } from "../../../constants";

export default function SequencerModulateButton(props) {
  return (
    <StyledModulateButton {...props}>
      {props.value}
    </StyledModulateButton>
  );
};

const StyledModulateButton = styled.button`
  width: 69px;
  height: 24px;
  margin: 5px;
  border: none;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: ${(props) => {
    if (props.name === MODULATE_BUTTON_TYPE.ROW) {
      return "#d1afab";
    }
    return "#977673";
  }};
  &:hover {
    filter: brightness(105%);
  }
`;
