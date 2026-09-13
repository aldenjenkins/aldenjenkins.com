$(document).ready(function () {
  window.learningInvestmentsChart = Highcharts.chart('container', {
    chart: {
      type: 'bubble',
      backgroundColor: '#f9f9f9',
      events: {
        click: function (e) {
          learningInvestmentsChart.tooltip.hide();
        }
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: 'A graph of ten years of learning investments'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Age of Investment (Years)'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
      labels: {
        enabled: true
      }
    },
    yAxis: {
      title: {
        text: 'Happiness Units ROI'
      },
      labels: {
        enabled: true
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      gridLineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0
    },
    tooltip: {
      formatter: function () {
        var className = this.point.name.toLowerCase().split(' ').join('-'),
          markup = document.getElementsByClassName(className)[0],
          description = "<h4>" + this.point.name + "</h4>";

        if (markup) {
          description += "<div class=description>" + markup.innerHTML + "</div>";
        }

        return description;
      },
      useHTML: true,
      whiteSpace: "normal",
      backgroundColor: '#f9f9f9',
      borderWidth: 1,
      borderColor: '#f9f9f9',
      hideDelay: 100
    },
    plotOptions: {
      series: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          allowOverlap: false
        }
      }
    },
    series: [{
      data: [
        {
          "name": "PHP",
          "x": 10.0,
          "y": 2.6,
          "z": 2.5
        },
        {
          "name": "Drupal",
          "x": 9.5,
          "y": 0.6666666666666666,
          "z": 3.0
        },
        {
          "name": "Wordpress",
          "x": 8.0,
          "y": 3.0,
          "z": 1.5
        },
        {
          "name": "Vim",
          "x": 9.5,
          "y": 3.0,
          "z": 4.0
        },
        {
          "name": "Intellij Editors",
          "x": 6.0,
          "y": 2.3333333333333335,
          "z": 3.0
        },
        {
          "name": "Python",
          "x": 7.0,
          "y": 3.0,
          "z": 5.0
        },
        {
          "name": "Meditation",
          "x": 4.5,
          "y": 5.222222222222222,
          "z": 4.5
        },
        {
          "name": "D&D",
          "x": 3.0,
          "y": 6.6,
          "z": 2.5
        },
        {
          "name": "REST",
          "x": 7.0,
          "y": 2.0,
          "z": 3.0
        },
        {
          "name": "Linux/UNIX",
          "x": 10.0,
          "y": 4.5,
          "z": 4.0
        },
        {
          "name": "HTTP",
          "x": 9.0,
          "y": 2.6666666666666665,
          "z": 3.0
        },
        {
          "name": "Node.js",
          "x": 6.0,
          "y": 1.0,
          "z": 1.0
        },
        {
          "name": "JavaScript",
          "x": 8.0,
          "y": 2.5,
          "z": 6.0
        },
        {
          "name": "Clojure",
          "x": 6.5,
          "y": 1.6666666666666667,
          "z": 1.5
        },
        {
          "name": "Functional Programming",
          "x": 6.5,
          "y": -0.5,
          "z": 2.0
        },
        {
          "name": "MySQL",
          "x": 6.0,
          "y": 0.0,
          "z": 2.0
        },
        {
          "name": "Django",
          "x": 7.0,
          "y": 1.8,
          "z": 5.0
        },
        {
          "name": "Ruby",
          "x": 1.0,
          "y": 6.5,
          "z": 2.0
        },
        {
          "name": "Rails",
          "x": 1.0,
          "y": 5.5,
          "z": 2.0
        },
        {
          "name": "Running",
          "x": 4.0,
          "y": 4.0,
          "z": 3.0
        },
        {
          "name": "Concurrency",
          "x": 7.5,
          "y": 4.333333333333333,
          "z": 3.0
        },
        {
          "name": "Filemaker Pro",
          "x": 9.0,
          "y": 0.0,
          "z": 2.0
        },
        {
          "name": "HTML/CSS/SASS",
          "x": 10.0,
          "y": 1.3333333333333333,
          "z": 6.0
        },
        {
          "name": "Java",
          "x": 5.0,
          "y": 2.75,
          "z": 2.0
        },
        {
          "name": "Devops",
          "x": 9.0,
          "y": 0.14285714285714285,
          "z": 3.5
        },
        {
          "name": "Management",
          "x": 2.0,
          "y": 1.2857142857142858,
          "z": 3.5
        },
        {
          "name": "Golang",
          "x": 4.5,
          "y": 3.0,
          "z": 2.0
        },
        {
          "name": "iOS Dev",
          "x": 6.5,
          "y": 1.0,
          "z": 3.0
        },
        {
          "name": "MongoDB",
          "x": 1.0,
          "y": 3.0,
          "z": 1.0
        },
        {
          "name": "PostgreSQL",
          "x": 9.0,
          "y": 1.0,
          "z": 3.5
        },
        {
          "name": "SQL",
          "x": 9.5,
          "y": 1.8333333333333333,
          "z": 3.0
        },
        {
          "name": "Solr",
          "x": 3.0,
          "y": 2.0,
          "z": 2.0
        },
        {
          "name": "Microservices",
          "x": 3.5,
          "y": 1.6666666666666667,
          "z": 3.0
        },
        {
          "name": "Responsive Design",
          "x": 4.0,
          "y": 3.25,
          "z": 2.0
        },
        {
          "name": "Web Security",
          "x": 6.0,
          "y": 1.0,
          "z": 3.5
        },
        {
          "name": "Tech Writing",
          "x": 9.0,
          "y": 2.6,
          "z": 2.5
        },
        {
          "name": "EPUB",
          "x": 4.0,
          "y": 2.5,
          "z": 1.0
        },
        {
          "name": "Algorithms",
          "x": 8.5,
          "y": 0.5,
          "z": 2.0
        },
        {
          "name": "Remote Work",
          "x": 6.0,
          "y": 2.8,
          "z": 2.5
        },
        {
          "name": "Docker",
          "x": 3.2,
          "y": 1.75,
          "z": 2.0
        },
        {
          "name": "UI/UX Design",
          "x": 0.5,
          "y": 4.0,
          "z": 1.0
        },
        {
          "name": "Kubernetes",
          "x": 0.0,
          "y": 5.0,
          "z": 1.0
        },
        {
          "name": "Graph Databases",
          "x": 0.5,
          "y": 3.5,
          "z": 1.0
        },
        {
          "name": "Cloud Infra.",
          "x": 6.5,
          "y": 2.0,
          "z": 3.0
        }
      ]
    }]
  });

  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      window.learningInvestmentsChart.tooltip.hide();
    }
  });
});
