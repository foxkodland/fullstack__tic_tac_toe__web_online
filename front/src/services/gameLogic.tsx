import type { AllowedCharsMap, findWinnerScheme } from "../types/types";


export const findWinner = (map: AllowedCharsMap[]): findWinnerScheme | null => {
  // горизонтали
  for (let i of [0, 3, 6]) {
    if (map[i] !== "" && map[i] === map[i + 1] && map[i] === map[i + 2]) {
      return {direction: "horizontal", index: i};
    }
  }

  // вертикали
  for (let i of [0, 1, 2]) {
    if (map[i] !== "" && map[i] === map[i + 3] && map[i] === map[i + 6]) {
      return {direction: "vertical", index: i};
    }
  }

  // диагонали
  if (map[0] !== "" && map[0] === map[4] && map[0] === map[8]) {
    return {direction: "diagonal-bottom", index: 0};
  }

  if (map[2] !== "" && map[2] === map[4] && map[2] === map[6]) {
    return {direction: "diagonal-top", index: 2};
  }

  return null;
}