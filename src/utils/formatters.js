// capitalize first letter string
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};