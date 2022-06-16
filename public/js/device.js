/* eslint-disable */
let stationID = 1;
function selectString(state) {
  if (state === true) return 'Hoạt Động';
  else return 'Lỗi!!!';
}
$(document).ready(function() {
  $('.mydatatable').DataTable({
    processing: true,
    serverSide: true,
    autoWidth: false,
    ordering: false,
    searching: false,
    ajax: {
      url: `/api/sensor/device-error/kingdom12/${stationID}`,
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
      { data: 'errorString' },
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
  $('.devicetable').DataTable({
    processing: true,
    serverSide: true,
    autoWidth: false,
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    ajax: {
      url: `/api/sensor/device-status/kingdom12/${stationID}`,
      dataSrc: function(json) {
        json.data[0].rainSensor = selectString(json.data[0].rainSensor);
        json.data[0].tempSensor = selectString(json.data[0].tempSensor);
        json.data[0].windSensor = selectString(json.data[0].windSensor);
        json.data[0].viewSensor = selectString(json.data[0].viewSensor);
        return json.data;
      },
    },
    columns: [
      { data: 'tempSensor' },
      { data: 'rainSensor' },
      { data: 'windSensor' },
      { data: 'viewSensor' },
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
    createdRow: function(row, data, index) {
      let i = 0;
      for (key in data) {
        if (data[key] === 'Lỗi!!!') {
          $(`td:eq(${i})`, row).css(
            'background-color',
            'rgba(244, 39, 35, 0.8)'
          );
        } else {
          $(`td:eq(${i})`, row).css(
            'background-color',
            'rgba(117, 202, 45, 0.8)'
          );
        }
        i++;
      }
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
  $('.devicetable')
    .DataTable()
    .ajax.reload(null, false);
}, 30000);
function stationChange() {
  stationID = document.getElementById('select-station').value;
  $('.mydatatable')
    .DataTable()
    .ajax.url(`/api/sensor/device-error/kingdom12/${stationID}`)
    .load();
  $('.devicetable')
    .DataTable()
    .ajax.url(`/api/sensor/device-status/kingdom12/${stationID}`)
    .load();
}
