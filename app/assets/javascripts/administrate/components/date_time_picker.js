$(function () {
  $('[data-type="time"]').each(function() {
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || 'HH:mm:ss',
      defaultDate: Date.parse($(this).val()),
    });
  });
  $('[data-type="date"]').each(function() {
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || 'YYYY-MM-DD',
      defaultDate: Date.parse($(this).val()),
    });
  });
  $('[data-type="datetime"]').each(function() {
    $(this).datetimepicker({
      debug: false,
      format: $(this).data('format') || 'YYYY-MM-DD HH:mm:ss',
      defaultDate: Date.parse($(this).val()),
    });
  });
});
