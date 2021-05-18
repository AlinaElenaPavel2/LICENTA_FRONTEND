import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core'
import * as Chart from 'chart.js'
import { DOCUMENT } from '@angular/common'
import ChartDataLabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('lineChart', { static: true })
  lineChart: ElementRef<HTMLCanvasElement>

  @ViewChild('barChart', { static: true })
  barChart: ElementRef<HTMLCanvasElement>

  @ViewChild('pieChart', { static: true })
  pieChart: ElementRef<HTMLCanvasElement>

  private ctxLine: CanvasRenderingContext2D
  private ctxBar: CanvasRenderingContext2D
  private ctxPie: CanvasRenderingContext2D

  displayLineChart () {
    setTimeout(() => {
      this.ctxLine = this.lineChart.nativeElement.getContext('2d')
    }, 100)
    setTimeout(() => {
      var myLineChart = new Chart(this.ctxLine, {
        type: 'line',
        data: {
          labels: ['Semestrul 1', 'Semestrul 2'],
          datasets: [
            {
              label: 'An 1',
              data: [8.01, 7.83],
              backgroundColor: ['rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)'],

              borderWidth: 3
            },
            {
              label: 'An 2',
              data: [7.83, 8.23],
              backgroundColor: ['rgba(255, 206, 86, 0.0)'],
              borderColor: ['rgba(255, 174, 66, .7)'],
              borderWidth: 3
            },
            {
              label: 'An 3',
              data: [8.43, 8.7],

              backgroundColor: ['rgba(255, 99, 132, 0.0)'],
              borderColor: ['rgba(255,99,132,1)'],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true
        }
      })
    }, 100)
  }

  displayBarChart () {
    setTimeout(() => {
      this.ctxBar = this.barChart.nativeElement.getContext('2d')
    }, 100)
    setTimeout(() => {
      //bar
      var myBarChart = new Chart(this.ctxBar, {
        type: 'bar',
        data: {
          labels: [
            'An 1 - Semestru 1',
            'An 1 - Semestru 2',
            'An 2 - Semestru 1',
            'An 2 - Semestru 2',
            'An 3 - Semestru 3',
            'An 3 - Semestru 2'
          ],
          datasets: [
            {
              label: 'Media mea',
              data: [7.56, 8.23, 8.38, 8.78, 7.02, 7.89],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            },
            {
              label: 'Nota finala medie',

              data: [8.01, 8.01, 8.01, 8.01, 8.01, 8.01],
              backgroundColor: ['rgba(255, 206, 86, 0.0)'],
              borderColor: ['rgba(255,99,132,1)'],
              borderWidth: 3,
              // Changes this dataset to become a line
              type: 'line'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      })
    }, 100)
  }

  displayPieChart () {
    setTimeout(() => {
      this.ctxPie = this.pieChart.nativeElement.getContext('2d')
    }, 100)

    setTimeout(() => {
      var myPieChart = new Chart(this.ctxPie, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
          labels: ['Examinari', 'Reexaminari', 'Re-Reexaminari'],
          datasets: [
            {
              data: [210, 130, 120],
              backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
              hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870']
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'right',
            labels: {
              padding: 12,
              boxWidth: 12,
              fontSize: 16
            }
          },
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                let sum = 0
                let dataArr =ctx.chart.data.datasets[0].data as number[]
                dataArr.map(data => {
                  sum += data
                })
                let percentage = ((value * 100) / sum).toFixed(2) + '%'
                return percentage
              },
              color: 'white',
              labels: {
                title: {
                  font: {
                    size: 15
                  }
                }
              }
            }
          }
        }
      })
    }, 100)
  }
  constructor () {}

  ngOnInit (): void {
    this.displayLineChart()
    this.displayBarChart()
    this.displayPieChart()
  }

  formatSubtitle = (percent: number): string => {
    if (percent >= 100) {
      return 'Congratulations!'
    } else if (percent >= 50) {
      return 'Half'
    } else if (percent > 0) {
      return 'Just began'
    } else {
      return 'Not started'
    }
  }

  titleFormat () {
    return '60'
  }
}
