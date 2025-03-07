export const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = seconds % 60;
  return { minutes, seconds: leftSeconds };
};
