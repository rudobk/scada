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
