const getCurrentFormattedTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = now.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const convertTimeStampFormat = (timestamp) => {
  const date = new Date(timestamp * 1000);
  date.setHours(date.getHours() + 7);
  return date.toISOString();
};

module.exports = {
  getCurrentFormattedTime,
  convertTimeStampFormat,
};
