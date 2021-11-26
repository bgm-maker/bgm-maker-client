import { useDispatch } from "react-redux";

import SequencerModulateButton from "../atoms/SequencerModulateButton";
import { setDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";

export default function SequencerModulateButtonGroup({ name }) {
  const dispatch = useDispatch();

  function handleExtendDropZone(event) {
    const { value, name } = event.target;

    try {
      dispatch(setDropZoneCount({ value, name }));
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <SequencerModulateButton
        onClick={handleExtendDropZone}
        value="+"
        name={name}
      >
      </SequencerModulateButton>
      <SequencerModulateButton
        onClick={handleExtendDropZone}
        value="-"
        name={name}
      >
      </SequencerModulateButton>
    </div>
  );
}
