$(function () {
  $('[data-type="time"]').datetimepicker({
    debug: false,
    format: "HH:mm:ss",
  });
  $('[data-type="datetime"]').datetimepicker({
    debug: false,
    format: "YYYY-MM-DD HH:mm:ss",
  });
});
