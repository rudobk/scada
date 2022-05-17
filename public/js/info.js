function convertOrientation(data) {
  let number, text;
  data.data.forEach(function(el) {
    number = el.wind['wind_orientation_1m'];
    switch (number) {
      case 1:
        text = 'Bắc';
        break;
      case 2:
        text = 'Đông Bắc';
        break;
      case 3:
        text = 'Đông';
        break;
      case 4:
        text = 'Đông Nam';
        break;
      case 5:
        text = 'Nam';
        break;
      case 6:
        text = 'Tây Nam';
        break;
      case 7:
        text = 'Tây';
        break;
      case 8:
        text = 'Tây Bắc';
        break;
      default:
        break;
    }
    el.wind['wind_orientation_1m'] = text;
  });
  return data;
}
function changeValue(data, id) {
  document.getElementById(
    `temp-value-${id}`
  ).innerHTML = `${data.data[0].temp.temp_1m} °C`;
  document.getElementById(
    `rain-value-${id}`
  ).innerHTML = `${data.data[0].rain.rain_1m} mm`;
  document.getElementById(
    `wind-value-${id}`
  ).innerHTML = `${data.data[0].wind.wind_speed_1m} m/s`;
  document.getElementById(
    `wind-oriental-${id}`
  ).innerHTML = `${data.data[0].wind.wind_orientation_1m}`;
  document.getElementById(
    `view-${id}`
  ).innerHTML = `${data.data[0].view.view} km`;
}
function checkDay(day) {
  switch (day) {
    case 1:
      return 'Thứ Hai';
    case 2:
      return 'Thứ Ba';
    case 3:
      return 'Thứ Tư';
    case 4:
      return 'Thứ Năm';
    case 5:
      return 'Thứ Sáu';
    case 6:
      return 'Thứ Bảy';
    case 0:
      return 'Chủ Nhật';
    default:
      break;
  }
}
function getData() {
  var date = new Date(Date.now());

  //   console.log(date.getFullYear(), date.getMonth(), date.getDate());
  document.getElementById('day-name').innerHTML = checkDay(date.getDay());
  document.getElementById(
    'date-string'
  ).innerHTML = `${date.getDate()} - ${date.getMonth() +
    1} - ${date.getFullYear()}`;
  document.getElementById('day-name-1').innerHTML = checkDay(date.getDay());
  document.getElementById(
    'date-string-1'
  ).innerHTML = `${date.getDate()} - ${date.getMonth() +
    1} - ${date.getFullYear()}`;
  $.ajax({
    url: '/api/sensor/get-data-1/kingdom12/1',
    success: function(data) {
      data = convertOrientation(data);
      changeValue(data, 1);
    },
  });
  $.ajax({
    url: '/api/sensor/get-data-1/kingdom12/2',
    success: function(data) {
      data = convertOrientation(data);
      changeValue(data, 2);
    },
  });
}
$(document).ready(function() {
  getData();
});
setInterval(function() {
  getData();
}, 30000);
