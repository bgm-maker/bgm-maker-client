import styled from "styled-components";

export default function SelectMoodButton(props) {
  return (
    <StyledSelectMoodButton {...props}>
      Let's Start!
    </StyledSelectMoodButton>
  );
}

const StyledSelectMoodButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 40vh;
  color: black;
  border-radius: 5px;
  margin: 10px;
  background-color: #e0d2c4;
  font-size: 2vw;
  font-family: cursive;
  opacity: 0.8;
  box-shadow: 0px 5px 10px #ede6e1 inset, 0px -5px 8px #afa49c inset;
`;
