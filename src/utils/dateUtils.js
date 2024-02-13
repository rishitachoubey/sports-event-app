export const dateTimeOptions = { hour: "numeric", minute: "2-digit" };

// Converts an ISO date string to a more readable time format.
export const convertDateToTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", dateTimeOptions);
};
