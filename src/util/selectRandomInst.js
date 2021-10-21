import {
  INSTRUMENTS_QUANTITY,
  INSTRUMENTS_OPTION_COUNT
} from "../constants";

export default function selectRandomInst(mood) {
  const currentMood = INSTRUMENTS_QUANTITY[mood];
  const result = {};

  for (const inst in currentMood) {
    if (currentMood[inst] === 0) throw new Error("불러올 수 있는 악기가 없습니다");
    if (result.hasOwnProperty(inst)) break;

    let condition = 0;
    result[inst] = [];

    if (currentMood[inst] < INSTRUMENTS_OPTION_COUNT) {
      condition = currentMood[inst];
    } else {
      condition = INSTRUMENTS_OPTION_COUNT;
    }

    for (let i = 0; i < condition; i++) {
      const randomNum = Math.floor((Math.random() * currentMood[inst]) + 1);
      if (result[inst].indexOf(randomNum) !== -1) {
        result[inst].push(randomNum);
      } else {
        i--;
      }
    }
  }

  return result;
}
