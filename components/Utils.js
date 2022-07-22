export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const toUpperCaseAndWithoutAccent = (value) => {
  return value
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const dateParser = (num) => {
  let options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};
