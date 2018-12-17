$(function () {
  $('[data-type="time"]').each(function(){
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || "HH:mm:ss",
    })
  });
  $('[data-type="date"]').each(function(){
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || "YYYY-MM-DD",
    })
  });
  $('[data-type="datetime"]').each(function(){
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || "YYYY-MM-DD HH:mm:ss",
    })
  });
});
