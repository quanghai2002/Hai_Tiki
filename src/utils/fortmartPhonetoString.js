function formatNumberWithDotSeparator(number) {
  return number.toLocaleString('en-US').replace(/,/g, '.');
}

export default formatNumberWithDotSeparator;