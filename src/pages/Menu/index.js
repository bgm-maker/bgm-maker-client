import styled from "styled-components";

import SelectMoodZone from "../../components/Menu/organisms/SelectMoodZone";
import backgroundImage from "../../assets/images/gridImage.svg";

export default function MenuPage() {

  return (
    <StyledMenuPage>
      <SelectMoodZone />
    </StyledMenuPage>
  );
}

const StyledMenuPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  background-image: url(${backgroundImage});
`;
