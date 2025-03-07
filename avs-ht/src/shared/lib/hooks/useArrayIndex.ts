import { useState } from 'react';

export const useArrayIndex = <E>(array: Array<E>) => {
  const [index, setIndex] = useState(0);
  const length = array.length;
  const increaseIndex = () => {
    setIndex(prev => (prev + 1) % length);
  };
  const reduceIndex = () => {
    setIndex(prev => (prev - 1 + length) % length);
  };
  return { index, increaseIndex, reduceIndex, setIndex };
};
