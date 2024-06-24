export function formatNumber(number: number) {
  const suffixes = [" K", " mln"];
  const steps = [1000, 1000000];

  let formattedNumber = number;
  let suffixIndex = 0;

  while (number >= steps[suffixIndex] && suffixIndex < suffixes.length) {
    formattedNumber = number / steps[suffixIndex];
    suffixIndex++;
  }

  return formattedNumber.toFixed(1) + (suffixIndex ? suffixes[suffixIndex - 1] : "");
}

export function formatNumberCommas(
  num: number | string | undefined = 0,
  minimumFractionDigits = 0, 
  maximumFractionDigits = 0
) {
  return (
    Number(num)?.toLocaleString('en-EN', { minimumFractionDigits, maximumFractionDigits }) ?? num
  )
}