export function formatPopularity(num) {
  const suffixes = ['', 'K', 'M', 'B'];
  let index = 0;
  while (num >= 1000 && index < suffixes.length - 1) {
    num /= 1000;
    index++;
  }
  return `${num.toFixed(1)}${suffixes[index]}`;
}