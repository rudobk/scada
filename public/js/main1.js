/* eslint-disable */
let stationID = 1;
function convertOrientation(data) {
  let number, text;
  data.forEach(function(el) {
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
  $('.mydatatable').DataTable({
    processing: true,
    serverSide: true,
    autoWidth: false,
    ordering: false,
    searching: false,
    ajax: {
      url: `/api/sensor/get-data-test/kingdom12/${stationID}`,
      data: function(dtParms) {
        dtParms.minDate = document.getElementById('min-date').value;
        dtParms.maxDate = document.getElementById('max-date').value;
        return dtParms;
      },
      dataSrc: 'data',
    },
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
      { data: 'OrientationString' },
      { data: 'view.view' },
      { data: 'view.view_max_1h' },
      { data: 'view.view_min_1h' },
      { data: 'view.view_avg_1h' },
    ],
    language: {
      emptyTable: 'Không có dữ liệu',
      info: 'Hiển thị _START_ - _END_ trong _TOTAL_ mục',
      infoFiltered: '(lọc từ tất cả _MAX_ mục)',
      lengthMenu: 'Hiển thị _MENU_ mục',
      loadingRecords: 'Đang tải...',
      processing: 'Đang xử lý...',
      paginate: {
        first: 'Đầu',
        last: 'Cuối',
        next: 'Tiếp',
        previous: 'Trước',
      },
    },
  });
});
function dateFunction() {
  $('.mydatatable')
    .DataTable()
    .ajax.reload(null, true);
}
setInterval(function() {
  $('.mydatatable')
    .DataTable()
    .ajax.reload(null, false);
}, 30000);
function stationChange() {
  stationID = document.getElementById('select-station').value;
  $('.mydatatable')
    .DataTable()
    .ajax.url(`/api/sensor/get-data-test/kingdom12/${stationID}`)
    .load();
}
