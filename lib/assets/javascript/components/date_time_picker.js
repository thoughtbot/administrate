import $ from "jquery";
import moment from "moment";
import datetimepicker from "bootstrap-datetimepicker-npm/src/js/bootstrap-datetimepicker.js";

window.moment = moment;
(datetimepicker)($);
window.$ = $;

$(function () {
  $('[data-type="time"]').datetimepicker({
    debug: false,
    format: 'HH:mm:ss',
  });
  $('[data-type="datetime"]').datetimepicker({
    debug: false,
    format: 'YYYY-MM-DD HH:mm:ss',
  });
  $('[data-type="date"]').datetimepicker({
    debug: false,
    format: 'YYYY-MM-DD',
  });
});
