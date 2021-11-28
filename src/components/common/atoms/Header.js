import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header({ children }) {
  const dispatch = useDispatch();

  function handleInitializeState() {
    if (children !== "/") return;

    dispatch({ type: "initializeState" });
  }

  return (
    <Link to={children}>
      <PageMoveButton onClick={handleInitializeState}>GO BACK</PageMoveButton>
    </Link>
  );
}

const PageMoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  min-height: 1em;
  padding: 2px 2px;
  border-radius: 10px;
  border: 0.1px solid #F2F6F5;
  margin-top: 10px;
  margin-left: 30px;
  font-weight: 100;
  color: #F2F6F5;
  background: #545658;
  background-color: #977673;
  box-shadow: 0px 5px 10px #CDC9C3 inset, 0px -5px 15px #654e46 inset;
`;
