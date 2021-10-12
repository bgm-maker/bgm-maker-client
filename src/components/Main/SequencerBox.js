import SequencerDropZone from "./SequencerDropZone";

export default function SequencerBox() {

  return (
    <div>
      <SequencerDropZone isFirstDropZone={true} />
      <SequencerDropZone />
      <SequencerDropZone />
      <SequencerDropZone />
    </div>
  );
}
