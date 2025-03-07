export const getShuffledArray = <K>(arr: Array<K>) =>
  [...arr].sort(() => Math.random() - 0.5);
