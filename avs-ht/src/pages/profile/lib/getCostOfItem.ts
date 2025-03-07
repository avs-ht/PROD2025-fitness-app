const BASE_VALUE = 3;
export const getCostOfItem = (itemStage: number) => {
  return Math.pow(BASE_VALUE, itemStage);
};
