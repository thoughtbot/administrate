$(function() {
  $(".field-unit--belongs-to select[data-remote-url]").each(function(index, field) {
    $(field).selectize({
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      preload: 'focus',
      load: function(query, callback) {
          if (!query.length) return callback();
          $.ajax({
              url: $(field).data('remote-url') + '?search=' + encodeURIComponent(query),
              type: 'GET',
              error: function(res) {
                  callback();
              },
              success: function(res) {
                  callback(res);
              }
          });
      }
    });
  });
});
