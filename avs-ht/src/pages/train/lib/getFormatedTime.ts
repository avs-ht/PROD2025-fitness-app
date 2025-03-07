export const getFormatedTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const hStr = h > 0 ? `${h} ч. ` : '';
  const mStr = m > 0 ? `${m} мин. ` : '';
  const sStr = `${s} сек.`;
  return `${hStr}${mStr}${sStr}`;
};
