import SequencerNote from "./SequencerNote";

export default function SequencerDropZone({ isFirstDropZone }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={isFirstDropZone ? { position: "relative", width: 100, height: 70, borderStyle: "solid", top: 19 } : { width: 100, height: 70, borderStyle: "solid" }}>
        <span>effect</span>
      </div>
      {
        Array.from(Array(8)).map((_, index) => (
          <div>
            {isFirstDropZone && <span>{index + 1}</span>}
            <div style={{ display: "flex" }}>
              <SequencerNote measure={index} quarter={1} />
              <SequencerNote measure={index} quarter={2} />
              <SequencerNote measure={index} quarter={3} />
              <SequencerNote measure={index} quarter={4} />
            </div>
          </div>
        ))
      }
    </div>
  );
}
