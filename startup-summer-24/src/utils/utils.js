export function formatPopularity(num) {
  const suffixes = ['', 'K', 'M', 'B'];
  let index = 0;
  while (num >= 1000 && index < suffixes.length - 1) {
    num /= 1000;
    index++;
  }
  return index < 1 ? num : `${num.toFixed(1)}${suffixes[index]}`;
};

export function formatMoney(money) {
  const formattedNumber = money.toLocaleString('en-US', { minimumFractionDigits: 0 });
  return `$${formattedNumber}`;
};

export function formatDate(releaseDate) {
  const date = new Date(releaseDate);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export function formatTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`;
};