$(function () {
  $(".datetimepicker").datetimepicker({
    debug: false,
    format: "YYYY-MM-DD HH:mm:ss",
  });

  $(".datepicker").datetimepicker({
    debug: false,
    format: "YYYY-MM-DD",
  });

  $(".timepicker").datetimepicker({
    debug: false,
    format: "HH:mm:ss",
  });
});
