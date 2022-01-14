import $ from "jquery";
import "selectize";

$(function() {
  $('.field-unit--belongs-to select').selectize({});
  $(".field-unit--has-many select").selectize({});
  $('.field-unit--polymorphic select').selectize({});
});
