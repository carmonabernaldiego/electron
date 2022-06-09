$(function() {
  'use strict'

  var gridLineColor = 'rgba(77, 138, 240, .1)';

  var colors = {
    primary:         "#727cf5",
    secondary:       "#7987a1",
    success:         "#42b72a",
    info:            "#68afff",
    warning:         "#fbbc06",
    danger:          "#ff3366",
    light:           "#ececec",
    dark:            "#282f3a",
    muted:           "#686868"
  }

  var flotChart1Data = [
    [0,49.331065063219285],
    [1,48.79814898366035],
    [2,50.61793547911337],
    [3,53.31696317779434],
    [4,54.78560952831719],
    [5,53.84293992505776],
    [6,54.682958355082874],
    [7,56.742547193381654],
    [8,56.99677491680908],
    [9,56.144488388681445],
    [10,56.567122269843885],
    [11,60.355022877262684],
    [12,58.7457726121753],
    [13,61.445407102315514],
    [14,61.112870581452086],
    [15,58.57202276349258],
    [16,54.72497594269612],
    [17,52.070341498681124],
    [18,51.09867716530438],
    [19,47.48185519192089],
    [20,48.57861168097493],
    [21,48.99789250679436],
    [22,53.582491800119456],
    [23,50.28407438696142],
    [24,46.24606628705599],
    [25,48.614330310543856],
    [26,51.75313497797672],
    [27,51.34463925296746],
    [28,50.217320673443936],
    [29,54.657281647073304],
    [30,52.445057217757245],
    [31,53.063914668561345],
    [32,57.07494250387825],
    [33,52.970403392565515],
    [34,48.723854145068756],
    [35,52.69064629353968],
    [36,53.590890118378205],
    [37,58.52332126105745],
    [38,55.1037709679581],
    [39,58.05347017020425],
    [40,61.350810521199946],
    [41,57.746188675088575],
    [42,60.276910973029786],
    [43,61.00841651851749],
    [44,57.786733623457636],
    [45,56.805721677811356],
    [46,58.90301959619822],
    [47,62.45091969566289],
    [48,58.75007922945926],
    [49,58.405842466185355],
    [50,56.746633122658444],
    [51,52.76631598845634],
    [52,52.3020769891715],
    [53,50.56370473325533],
    [54,55.407205992344544],
    [55,50.49825590435839],
    [56,52.4975614755482],
    [57,48.79614749316488],
    [58,47.46776704767111],
    [59,43.317880548036456],
    [60,38.96296121124144],
    [61,34.73218432559628],
    [62,31.033700732272116],
    [63,32.637987000382296],
    [64,36.89513637594264],
    [65,35.89701755609185],
    [66,32.742284578187544],
    [67,33.20516407297906],
    [68,30.82094321791933],
    [69,28.64770271525896],
    [70,28.44679026902145],
    [71,27.737654438195236],
    [72,27.755190738237744],
    [73,25.96228929938593],
    [74,24.38197394166947],
    [75,21.95038772723346],
    [76,22.08944448751686],
    [77,23.54611335622507],
    [78,27.309610481106425],
    [79,30.276849322378055],
    [80,27.25409223418214],
    [81,29.920374921780102],
    [82,25.143447932376702],
    [83,23.09444253479626],
    [84,23.79459089729409],
    [85,23.46775072519832],
    [86,27.9908486073969],
    [87,23.218855925354447],
    [88,23.9163141686872],
    [89,19.217667423877607],
    [90,15.135179958932145],
    [91,15.08666008920407],
    [92,11.006269617032526],
    [93,9.201671310476282],
    [94,7.475865090236113],
    [95,11.645754524211824],
    [96,15.76161040821357],
    [97,13.995208323029495],
    [98,12.59338056489445],
    [99,13.536707176236195],
    [100,15.01308268888571],
    [101,13.957161242832626],
    [102,13.237091619700053],
    [103,18.10178875669874],
    [104,20.634765519499563],
    [105,21.064946755449817],
    [106,25.370593801826132],
    [107,25.321453557866203],
    [108,20.947464543531186],
    [109,18.750516645477425],
    [110,15.382042945356737],
    [111,14.569147793065632],
    [112,17.949159188821604],
    [113,15.965876707018058],
    [114,16.359355082317443],
    [115,14.163139419453657],
    [116,12.106761506858124],
    [117,14.843319717588216],
    [118,17.24291158460492],
    [119,17.799018581487058],
    [120,14.038359368301329],
    [121,18.658227817264983],
    [122,18.463689935573676],
    [123,22.687619584142652],
    [124,25.088957744790036],
    [125,28.184893996099582],
    [126,28.03276492115397],
    [127,24.11167758305713],
    [128,24.28007484247854],
    [129,28.23487421795626],
    [130,26.246971673504287],
    [131,29.330939820784877],
    [132,26.07749855928238],
    [133,23.921786397788168],
    [134,28.825012181053275],
    [135,25.140449169947626],
    [136,21.79048000172746],
    [137,23.05414699421924],
    [138,20.712904460250886],
    [139,29.727388210287337],
    [140,30.219713454550508],
    [141,32.567062865467058],
    [142,31.46105146001275],
    [143,33.699736621958863],
    [144,30.05510726036824],
    [145,34.200669070105356],
    [146,36.938945414022744],
    [147,35.50411643355061],
    [148,34.788500646665874],
    [149,36.97330575970296]
  ];

  // Dashbaord date start
  if($('#dashboardDate').length) {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('#dashboardDate').datepicker({
      format: "dd-MM-yyyy",
      todayHighlight: true,
      autoclose: true
    });
    $('#dashboardDate').datepicker('setDate', today);
  }
  // Dashbaord date end

  // Flot chart1 start
  if($('#flotChart1').length) {
    $.plot('#flotChart1', [{
      data: flotChart1Data,
      color: '#727cf5'
      }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: 'transparent'
        }
      },
      grid: {
        borderColor: 'transparent',
        borderWidth: 1,
        labelMargin: 0,
        aboveData: false
      },
      yaxis: {
        show: true,
        color: 'rgba(0,0,0,0.06)',
        ticks: [[0, ''], [15, '$8400k'], [30, '$8500k'], [45, '$8600k'], [60, '$8700k'], [75, '$8800k']],
        tickColor: gridLineColor,
        min: 0,
        max: 80,
        font: {
          size: 11,
          weight: '600',
          color: colors.muted
        }
      },
      xaxis: {
        show: true,
        color: 'rgba(0,0,0,0.1)',
        ticks: [[0, 'Jan'], [20, 'Feb'], [40, 'Mar'], [60, 'Apr'], [80, 'May'], [100, 'June'], [120, 'July'], [140, 'Aug']],
        tickColor: gridLineColor,      
        font: {
          size: 13,
          color: colors.muted
        },
        reserveSpace: false
      }
    });
  }
  // Flot chart1 end

  // Apex chart1 start
  if($('#apexChart1').length) {
    var options1 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
          data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
      }],
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };
    new ApexCharts(document.querySelector("#apexChart1"),options1).render();
  }
  // Apex chart1 end

  // Apex chart2 start
  if($('#apexChart2').length) {
    var options2 = {
      chart: {
        type: "bar",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "60%"
        }
      },
      colors: ["#727cf5"],
      series: [{
        data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        }
      },
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };
    new ApexCharts(document.querySelector("#apexChart2"),options2).render();
  }
  // Apex chart2 end

  // Apex chart3 start
  if($('#apexChart3').length) {
    var options3 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
          data: [41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89]
      }],
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: !1
        },
        x: {
          show: !1
        },
        y: {
          title: {
            formatter: function(e) {
              return ""
            }
          }
        },
        marker: {
          show: !1
        }
      }
    };
    new ApexCharts(document.querySelector("#apexChart3"),options3).render();
  }
  // Apex chart3 end

  // Progressgar1 start
  if($('#progressbar1').length) {
    var bar = new ProgressBar.Circle(progressbar1, {
      color: colors.primary,
      trailColor: gridLineColor,
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: colors.primary, width: 1 },
      to: { color: colors.primary, width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }
    
      }
    });
    bar.text.style.fontFamily = "'Overpass', sans-serif;";
    bar.text.style.fontSize = '3rem';
    
    bar.animate(.78);
  }
  // Progressgar1 start

  // Monthly sales chart start
  if($('#monthly-sales-chart').length) {
    var monthlySalesChart = document.getElementById('monthly-sales-chart').getContext('2d');
      new Chart(monthlySalesChart, {
        type: 'bar',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
            label: 'Sales',
            data: [150,110,90,115,125,160,190,140,100,110,120,120],
            backgroundColor: colors.primary
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
              labels: {
                display: false
              }
          },
          scales: {
            xAxes: [{
              display: true,
              barPercentage: .3,
              categoryPercentage: .6,
              gridLines: {
                display: false
              },
              ticks: {
                fontColor: '#8392a5',
                fontSize: 10
              }
            }],
            yAxes: [{
              gridLines: {
                color: gridLineColor
              },
              ticks: {
                fontColor: '#8392a5',
                fontSize: 10,
                min: 80,
                max: 200
              }
            }]
          }
        }
      }
    );
  }
  // Monthly sales chart end

});