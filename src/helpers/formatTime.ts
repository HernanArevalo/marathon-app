export function formatTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((milliseconds % 3600000) / 60000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((milliseconds % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');
  return { hours, minutes, seconds, millisecondsPart };
}