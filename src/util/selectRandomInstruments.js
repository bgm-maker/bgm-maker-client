import {
  INSTRUMENTS_QUANTITY,
  INSTRUMENTS_OPTION_COUNT
} from "../constants";

export default function selectRandomInstruments(mood) {
  const totalCurrentMoodInstrument = INSTRUMENTS_QUANTITY[mood.toUpperCase()];
  const result = {};

  for (const instrument in totalCurrentMoodInstrument) {
    if (totalCurrentMoodInstrument[instrument] === 0) throw new Error("악기 샘플을 불러올 수 없습니다.");
    if (result.hasOwnProperty(instrument)) break;

    let condition = 0;
    result[instrument] = [];

    if (totalCurrentMoodInstrument[instrument] < INSTRUMENTS_OPTION_COUNT) {
      condition = totalCurrentMoodInstrument[instrument];
    } else {
      condition = INSTRUMENTS_OPTION_COUNT;
    }

    for (let i = 0; i < condition; i++) {
      const randomNum = Math.floor((Math.random() * totalCurrentMoodInstrument[instrument]) + 1);
      if (result[instrument].indexOf(randomNum) === -1) {
        result[instrument].push(randomNum);
      } else {
        i--;
      }
    }
  }

  return result;
}
