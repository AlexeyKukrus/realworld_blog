export const formatTitle = (item) => {
  let string = item;
  if (item.length > 50) {
    string = string.slice(0, string.indexOf(' ', 50));
    string += ' ...';
  }
  return string;
};

export const formatDescription = (item) => {
  let string = item;
  if (item.length > 170) {
    string = string.slice(0, string.indexOf(' ', 170));
    string += ' ...';
  }
  return string;
};
