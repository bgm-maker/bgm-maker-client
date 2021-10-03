import InstrumentSampleSource from "./InstrumentSampleSource";

export default function InstrumentSampleBox() {
  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      {arr.map((num, index) =>
        <div style={{ display: "flex" }} key={index}>
          <div style={{ width: 70, height: 40, borderStyle: "solid" }}>여기는 악기 선택창</div>
          <InstrumentSampleSource />
          <InstrumentSampleSource />
          <InstrumentSampleSource />
          <InstrumentSampleSource />
          <InstrumentSampleSource />
        </div>
      )}
    </>
  );
}
