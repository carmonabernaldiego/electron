$(function () {
  'use strict';

  $(function () {
    $('#dataTable').DataTable({
      "aLengthMenu": [
        [10, 30, 50, -1],
        [10, 30, 50, "todo"]
      ],
      "iDisplayLength": 10,
      "language": {
        url: "./js/es-MX.json",
        search: ""
      }
    });
    $('#dataTable').each(function () {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Search');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });
});