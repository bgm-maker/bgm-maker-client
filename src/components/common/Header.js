import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header({ children }) {

  return (
    <Link to={children}>
      <PageMoveButton>GO BACK</PageMoveButton>
    </Link>
  );
}

const PageMoveButton = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 29px;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  min-height: 1em;
  padding: 2px 2px;
  border-radius: 10px;
  border: 0.1px solid #F2F6F5;
  font-weight: 100;
  color: #F2F6F5;
  background: #545658;
  background-color: #977673;
  box-shadow: 0px 5px 10px #CDC9C3 inset, 0px -5px 15px #654e46 inset;
`;
