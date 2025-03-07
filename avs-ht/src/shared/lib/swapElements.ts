export const swapElements = <T>(
  array: T[],
  firstIndex: number,
  secondIndex: number
): T[] => {
  const newOrder: T[] = [];
  array.forEach((ex, index) => {
    if (index === firstIndex) newOrder.push(array[secondIndex]);
    else if (index === secondIndex) newOrder.push(array[firstIndex]);
    else newOrder.push(ex);
  });
  return newOrder;
};
