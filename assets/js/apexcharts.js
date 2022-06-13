$(function() {
  'use strict';

  // Apex Line chart start
  var options = {
    chart: {
      height: 300,
      type: "line",
      parentHeightOffset: 0
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0"],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    series: [
      {
        name: "Data a",
        data: [45, 52, 38, 45]
      },
      {
        name: "Data b",
        data: [12, 42, 68, 33]
      },
      {
        name:
          "Data c",
        data: [8, 32, 48, 53]
      }
    ],
    xaxis: {
      type: "datetime",
      categories: ["2015", "2016", "2017", "2018"]
    },
    markers: {
      size: 0
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'left',
      containerMargin: {
        top: 30
      }
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          legend: {
            fontSize: "11px"
          }
        }
      }
    ]
  };
  var apexLineChart = new ApexCharts(document.querySelector("#apexLine"), options);
  apexLineChart.render();
  // Apex Line chart end

  // Apex Bar chart start
  var options = {
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0
    },
    colors: ["#f77eb9"],    
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    series: [{
      name: 'sales',
      data: [30,40,45,50,49,60,70,91,125]
    }],
    xaxis: {
      type: 'datetime',
      categories: ['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999']
    }
  }
  
  var apexBarChart = new ApexCharts(document.querySelector("#apexBar"), options);
  
  apexBarChart.render();
  // Apex Bar chart end

  // Apex Area chart start
  var options = {
    chart: {
      type: "area",
      height: 300,
      parentHeightOffset: 0,
      foreColor: "#999",
      stacked: true,
      dropShadow: {
        enabled: true,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 0.06
      }
    },
    colors: ["#f77eb9", "#7ee5e5"],
    stroke: {
      curve: "smooth",
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      name: 'Total Views',
      data: generateDayWiseTimeSeries(0, 18)
    }, {
      name: 'Unique Views',
      data: generateDayWiseTimeSeries(1, 18)
    }],
    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6
      }
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      labels: {
        offsetX: 24,
        offsetY: -5
      },
      tooltip: {
        enabled: true
      }
    },
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        left: -5,
        right: 5,
        bottom: -15
      }
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy"
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    fill: {
      type: "solid",
      fillOpacity: 0.7
    }
  };

  var chart = new ApexCharts(document.querySelector("#apexArea"), options);

  chart.render();

  function generateDayWiseTimeSeries(s, count) {
    var values = [[
      4,3,10,9,29,19,25,9,12,7,19,5,13,9,17,2,7,5
    ], [
      2,3,8,7,22,16,23,7,11,5,12,5,10,4,15,2,6,2
    ]];
    var i = 0;
    var series = [];
    var x = new Date("11 Nov 2012").getTime();
    while (i < count) {
      series.push([x, values[s][i]]);
      x += 86400000;
      i++;
    }
    return series;
  }
  // Apex Area chart end

  // Apex Donut chart start
  var options = {
    chart: {
      height: 300,
      type: "donut"
    },
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0","#fbbc06"],
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    dataLabels: {
      enabled: false
    },
    series: [44, 55, 13, 33]
  };
  
  var chart = new ApexCharts(document.querySelector("#apexDonut"), options);
  
  chart.render();
  // Apex Donut chart start
  
  // Apex Pie chart end
  var options = {
    chart: {
      height: 300,
      type: "pie"
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0","#fbbc06"],
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    dataLabels: {
      enabled: false
    },
    series: [44, 55, 13, 33]
  };
  
  var chart = new ApexCharts(document.querySelector("#apexPie"), options);
  
  chart.render();  
  // Apex Pie chart end

  // Apex Mixed chart start
  var options = {
    chart: {
      height: 300,
      type: 'line',
      stacked: false,
      parentHeightOffset: 0
    },
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    series: [{
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: 'TEAM B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }],
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    fill: {
      opacity: [0.85,0.25,1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003'],
    markers: {
      size: 0
    },
    xaxis: {
      type:'datetime'
    },
    yaxis: {
      title: {
        text: 'Points',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0) + " points";
          }
          return y;
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(2) + " $";
          }
          return y;
        }
      }]
    }
  }
  var chart = new ApexCharts(
    document.querySelector("#apexMixed"),
    options
  );
  chart.render();
  // Apex Mixed chart end

  // Apex Radar chart start
  var options = {
    chart: {
      height: 300,
      type: 'radar',
      parentHeightOffset: 0,
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0"],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    series: [{
      name: 'Series 1',
      data: [80, 50, 30, 40, 100, 20],
    }, {
      name: 'Series 2',
      data: [20, 30, 40, 80, 20, 80],
    }, {
      name: 'Series 3',
      data: [44, 76, 78, 13, 43, 10],
    }],
    stroke: {
      width: 0
    },
    fill: {
      opacity: 0.4
    },
    markers: {
      size: 0
    },
    labels: ['2011', '2012', '2013', '2014', '2015', '2016']
  }

  var chart = new ApexCharts(
      document.querySelector("#apexRadar"),
      options
  );

  chart.render();
  // Apex Radar chart end

  // Apex Radialbar chart start
  var options = {
    chart: {
      height: 300,
      type: "radialBar",
      parentHeightOffset: 0
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0","#fbbc06"],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        top: 10
      }
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: 'TOTAL'
          }
        }
      }
    },
    series: [44, 55, 67, 83],
    labels: ["Apples", "Oranges", "Bananas", "Berries"]
  };
  
  var chart = new ApexCharts(document.querySelector("#apexRadialBar"), options);
  
  chart.render();
  
  var chartAreaBounds = chart.w.globals.dom.baseEl.querySelector('.apexcharts-inner').getBoundingClientRect();
  // Apex Radialbar chart end

  // Apex Scatter chart start
  var options = {
    chart: {
      height: 300,
      type: 'scatter',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    colors: ["#f77eb9", "#7ee5e5","#4d8af0"],
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    series: [{
      name: "SAMPLE A",
      data: [
      [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
    },{
      name: "SAMPLE B",
      data: [
      [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
    },{
      name: "SAMPLE C",
      data: [
      [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
    }],
    xaxis: {
      tickAmount: 10,
      labels: {
        formatter: function(val) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      tickAmount: 7
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#apexScatter"),
    options
  );

  chart.render();
  // Apex Scatter chart end

  // Apex Heat chart start
  function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}


var options = {
    chart: {
      height: 300,
      type: 'heatmap',
      parentHeightOffset: 0
    },
    grid: {
      borderColor: "rgba(77, 138, 240, .1)",
      padding: {
        bottom: -15
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    series: [{
        name: 'Metric1',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric2',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric3',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric4',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric5',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric6',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric7',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric8',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric9',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      }
    ],
    title: {
      text: 'HeatMap Chart (Single color)'
    },

  }

  var chart = new ApexCharts(
    document.querySelector("#apexHeatMap"),
    options
  );

  chart.render();
  // Apex Heat chart end
  
  

  

});