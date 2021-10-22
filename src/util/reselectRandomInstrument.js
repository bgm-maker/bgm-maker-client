import {
  INSTRUMENTS_QUANTITY,
  INSTRUMENTS_OPTION_COUNT
} from "../constants";

export default function reselectRandomInstrument(param, selectedRandomNums) {
  const { instType, samples, currentSample } = param;
  const currentMood = selectedRandomNums.mood.toUpperCase();
  const currentRandomNums = [...selectedRandomNums[instType]];
  const instrumentCount = INSTRUMENTS_QUANTITY[currentMood][instType];

  if (instrumentCount <= INSTRUMENTS_OPTION_COUNT) {
    throw new Error("더이상 새로고침할 샘플이 없습니다");
  }

  if (instrumentCount <= currentRandomNums.length) {
    throw new Error("더이상 새로고침할 샘플이 없습니다");
  }

  const index = samples.findIndex((item) => item[1] === currentSample[1]);

  for (let i = 0; i < currentRandomNums.length; i++) {
    const randomNum = Math.floor((Math.random() * instrumentCount + 1));

    if (currentRandomNums.indexOf(randomNum) === -1) {
      currentRandomNums.push(randomNum);
      break;
    } else {
      i--;
    }
  }

  return { index, currentRandomNums };
};
