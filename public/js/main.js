/* eslint-disable */
let stationID = 1;
function get(url, callback) {
  $.ajax({
    url: url,
    type: 'GET',
    async: true,
    success: function(response) {
      callback(response);
    },
  });
}
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
$(document).ready(function() {
  get(`/api/sensor/get-data/kingdom12/${stationID}`, function(data) {
    data = convertOrientation(data);
    $('.mydatatable').DataTable({
      drawCallback: function() {
        // console.log('conem')
        var api = this.api();
        var rowCount = api.rows({ page: 'current' }).count();

        for (
          var i = 0;
          i < api.page.len() - (rowCount === 0 ? 1 : rowCount);
          i++
        ) {
          $('.mydatatable').append(
            $(
              '<tr ><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
            )
          );
        }
      },
      autoWidth: false,
      ordering: false,
      stateSave: true,
      data: data.data,
      columns: [
        { data: 'dateString' },
        { data: 'timeString' },
        { data: 'temp.temp_1m' },
        { data: 'temp.temp_max_1h' },
        { data: 'temp.temp_min_1h' },
        { data: 'temp.temp_avg_1h' },
        { data: 'rain.rain_1m' },
        { data: 'rain.rain_1h' },
        { data: 'wind.wind_speed_1m' },
        { data: 'wind.wind_orientation_1m' },
        { data: 'view.view' },
        { data: 'view.view_max_1h' },
        { data: 'view.view_min_1h' },
        { data: 'view.view_avg_1h' },
      ],
    });
  });
  setInterval(function() {
    get(`/api/sensor/get-data/kingdom12/${stationID}`, function(data) {
      data = convertOrientation(data);
      $('.mydatatable')
        .DataTable()
        .clear()
        .rows.add(data.data)
        .draw('full-hold');
    });
  }, 30000);
});
function stationChange() {
  stationID = document.getElementById('select-station').value;
  get(`/api/sensor/get-data/kingdom12/${stationID}`, function(data) {
    data = convertOrientation(data);
    $('.mydatatable')
      .DataTable()
      .clear()
      .rows.add(data.data)
      .draw();
  });
}
