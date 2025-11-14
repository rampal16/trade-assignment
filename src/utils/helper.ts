export const formateDate = (date?: Date): string => {
  // Create a new Date object representing the current date and time
  let today: Date;
  if (date) {
    today = date;
  } else {
    today = new Date();
  }

  // Get the day of the month (1-31)
  const day = today.getDate();

  // Get the month (0-11, where 0 is January and 11 is December)
  // Add 1 to normalize it to a 1-12 range
  const month = today.getMonth() + 1;

  // Get the full year (e.g., 2025)
  const year = today.getFullYear();

  // You can also format it as a string
  //return `${month}/${day}/${year}`;
  return `${year}-${month}-${day}`;
};
