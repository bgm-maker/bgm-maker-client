import { useDispatch } from "react-redux";

import { getInstruments } from "../../feature/instrumentSlice";
import selectRandomInst from "../../util/selectRandomInst";

export default function MenuPage() {
  const dispatch = useDispatch();

  function handleMakeSampler(event) {
    const selectedMood = event.target.value;
    const selectedInst = selectRandomInst(selectedMood);
    dispatch(getInstruments(selectedInst));
  }

  return (
    <div>
      <button value="COOL" onClick={handleMakeSampler}>청량한</button>
      <button value="FUN" onClick={handleMakeSampler}>신나는</button>
      <button value="LONESOME" onClick={handleMakeSampler}>쓸쓸한</button>
      <button value="CALM" onClick={handleMakeSampler}>잔잔한</button>
      <button value="DREAMY" onClick={handleMakeSampler}>몽환적인</button>
    </div>
  );
}
