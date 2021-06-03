import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core'
import * as Chart from 'chart.js'
import { DOCUMENT } from '@angular/common'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { StudentService } from '../Services/StudentService/student.service'
import { Student } from '../Models/student'
import { ChartComponent } from 'ng-apexcharts'
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts'

export type ChartOptions = {
  series: ApexNonAxisChartSeries
  chart: ApexChart
  responsive: ApexResponsive[]
  labels: any
  fill: {
    colors: ['#60e684', '#e6d460', '#d14141']
  }
}

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

  @ViewChild('chart') chart: ChartComponent
  public chartOptions: Partial<ChartOptions>

  private ctxLine: CanvasRenderingContext2D
  private ctxBar: CanvasRenderingContext2D
  private ctxPie: CanvasRenderingContext2D
  name: string
  student: Student = new Student()
  years: number[] = []
  selected: number
  labels: string[] = ['ECBD', 'PSB', 'PAW','SVA','PDM','ALG','SD','PA']
  data: number[] = [8.01, 7.83, 9.0,7.0,8.23,7.8,8.8,9.0]
  backgroundColor: string[] = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(219, 81, 123, 0.2)',
    'rgba(58, 196, 16, 0.2)'
  ]
  borderColor: string[] = [
    'rgba(54, 162, 235, 1)',
    'rgba(219, 81, 123, 1)',
    'rgba(58, 196, 16, 1)'
  ]
  label = 'Grafic note obtinute'

  barLabels: string[] = ['Semestru 1', 'Semestru 2']
  barBackgroundColor: string[] = [
    'rgba(242, 185, 87, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ]

  barBorderColor: string[] = [
    'rgba(242, 185, 87,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
  barLabel = 'Media mea pe anul 1'
  medieStudent: number[] = [7.8, 8.4]
  medieGenerala: number[] = [8.8, 8.8]
  displayLineChart (
    label,
    customLabels,
    customData,
    backgroundColor,
    borderColor
  ) {
    setTimeout(() => {
      this.ctxLine = this.lineChart.nativeElement.getContext('2d')
    }, 100)
    setTimeout(() => {
      var myLineChart = new Chart(this.ctxLine, {
        type: 'line',
        data: {
          labels: customLabels,
          datasets: [
            {
              label: label,
              data: customData,
              backgroundColor: backgroundColor,
              borderColor: borderColor,

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

  displayBarChart (
    barLabel,
    labels,
    medieGenerala,
    medieStudent,
    backgroundColor,
    borderColor
  ) {
    setTimeout(() => {
      this.ctxBar = this.barChart.nativeElement.getContext('2d')
    }, 100)
    setTimeout(() => {
      var myBarChart = new Chart(this.ctxBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: barLabel,
              data: medieStudent,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 2
            },
            {
              label: 'Nota finala medie',
              data: medieGenerala,
              backgroundColor: ['rgba(255, 206, 86, 0.0)'],
              borderColor: ['rgba(255,99,132,1)'],
              borderWidth: 3,
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
              fill: true,
              data: [210, 130, 120],
              backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
              hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
              borderWidth: [2, 2]
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
          title: {
            display: true,
            text: 'Numarul de examene sustinute',
            position: 'top'
          },
          plugins: {
            datalabels: {
              display: true,
              anchor: 'end',
              align: 'top',
              formatter: Math.round,
              // formatter: (value, ctx) => {
              //   let sum = 0
              //   let dataArr = ctx.chart.data.datasets[0].data
              //   dataArr.map(data => {
              //     sum += data
              //   })
              //   let percentage = (value * 100 / sum).toFixed(2) + '%'
              //   return percentage
              // },
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

  async getDataForStudent (name) {
    var stud
    stud = await this.studentService.sendStudentDetails(name)

    this.student.add(
      stud.id_student,
      stud.nume,
      stud.email,
      stud.telefon,
      stud.an,
      stud.specializare,
      stud.grupa,
      stud.program_studiu
    )

    for (var i = 0; i < stud.an; i++) {
      this.years.push(i + 1)
    }
    this.years.reverse()
    this.selected = this.years[0]
    this.label = 'Grafic note obtinute in anul ' + this.selected
  }
  constructor (private studentService: StudentService) {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.getDataForStudent(this.name)
    }, 100)

    this.displayLineChart(
      this.label,
      this.labels,
      this.data,
      this.backgroundColor[0],
      this.borderColor[0]
    )
    this.displayBarChart(
      this.barLabel,
      this.barLabels,
      this.medieGenerala,
      this.medieStudent,
      [this.barBackgroundColor[0], this.barBackgroundColor[1]],
      [this.barBorderColor[0], this.barBorderColor[1]]
    )
    this.displayPieChart2()
  }

  ngOnInit (): void {
    // this.displayLineChart(
    //   this.label,
    //   this.labels,
    //   this.data,
    //   this.backgroundColor[0],
    //   this.borderColor[0]
    // )
    // this.displayBarChart(
    //   this.barLabel,
    //   this.barLabels,
    //   this.medieGenerala,
    //   this.medieStudent,
    //   [this.barBackgroundColor[0], this.barBackgroundColor[1]],
    //   [this.barBorderColor[0], this.barBorderColor[1]]
    // )
    // this.displayPieChart2()
  }

  formatSubtitle = (percent: number): string => {
    if (percent >= 100) {
      return 'Congratulations!'
    } else if (percent >= 80) {
      return 'Almost done!'
    } else if (percent > 50) {
      return 'Half'
    } else if (percent >= 0) {
      return 'Just began'
    } else {
      return 'Not started'
    }
  }

  titleFormat () {
    return '60'
  }

  yearChangedNote (value) {
    console.log(value)
    var label = 'Grafic note obtinute in anul ' + value

    var customlabels = ['MS', 'IA', 'IOC']
    var customData = [7.9, 8.3, 8.9]

    this.displayLineChart(
      label,
      customlabels,
      customData,
      this.backgroundColor[value - 1],
      this.borderColor[value - 1]
    )
  }

  yearChangedEvolutie (value) {
    var label = 'Media mea pe anul ' + value
    var medieGenerala = [7.23, 7.23]
    var medieStudent = [6.5, 8.5]
    this.displayBarChart(
      label,
      this.barLabels,
      medieGenerala,
      medieStudent,
      [this.barBackgroundColor[value + 1], this.barBackgroundColor[value + 2]],
      [this.barBorderColor[value + 1], this.barBorderColor[value + 2]]
    )
  }

  displayPieChart2 () {
    this.chartOptions = {
      series: [20, 13, 7],

      chart: {
        height: 480,
        width: 680,
        type: 'pie'
      },
      labels: ['Examinari', 'Reexaminari', 'Re-reexaminari'],

      responsive: [
        {
          breakpoint: 580,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }
}
