function convertTime(time) {
  const date = new Date(time);
  var newDate = new Date(date.getTime());
  return `${newDate.getHours()}`;
}
module.exports = convertTime;
