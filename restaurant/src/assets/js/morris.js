$(function() {
  'use strict';

  var gridLineColor = 'rgba(77, 138, 240, .2)';

  new Morris.Line({
    element: 'morrisLine',
    data: [
      { year: '2008', value: 2 },
      { year: '2009', value: 9 },
      { year: '2010', value: 5 },
      { year: '2011', value: 12 },
      { year: '2012', value: 5 }
    ],
    xkey: 'year',
    ykeys: ['value'],
    labels: ['value'],
    lineColors: ['#f77eb9'],
    gridLineColor: [gridLineColor]
  });

  Morris.Area({
    element: 'morrisArea',
    data: [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B'],
    lineColors: ["#f77eb9", "#7ee5e5"],
    gridLineColor: [gridLineColor]
  });

  Morris.Bar({
    element: 'morrisBar',
    data: [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B'],
    barColors: ["#f77eb9", "#7ee5e5"],
    gridLineColor: [gridLineColor]
  });

  Morris.Donut({
    element: 'morrisDonut',
    data: [
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20}
    ],
    colors: ["#f77eb9", "#7ee5e5", "#4d8af0"],
    labelColor: 'rgba(77, 138, 240, .3)'
  });

});