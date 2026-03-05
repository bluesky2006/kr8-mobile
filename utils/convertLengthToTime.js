export function convertLengthToTime(length) {
  const secondsTotal = Number(length);
  if (!Number.isFinite(secondsTotal) || secondsTotal < 0) return null;

  const minutes = Math.floor(secondsTotal / 60);
  const seconds = Math.floor(secondsTotal % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
