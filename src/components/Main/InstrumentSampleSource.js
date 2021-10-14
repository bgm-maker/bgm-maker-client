import useDragSample from "../../customHooks/useDragSample";
import useSingleAndDoubleClick from "../../customHooks/useSingleAndDoubleClick";

export default function InstrumentSampleSource({ handleShowSample, sample, history }) {
  const [isDragging, drag] = useDragSample(handleShowSample, sample);
  const { handleSingleClick, handleDoubleClick } = useSingleAndDoubleClick(handlePlaySample, handleRouteSampleDetail);
  function handlePlaySample() {
    sample[0].start();
  }

  function handleRouteSampleDetail() {
    history.push("/myPreset", sample[1]);
  }

  return (
    <div>
      <div
        ref={drag}
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: 120,
          height: 40,
          borderStyle: "solid",
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: "lightcoral",
        }}
      >
        <span>sample</span>
        <span>click</span>
      </div>
    </div>
  );
}
