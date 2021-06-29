import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core'
import * as Chart from 'chart.js'
import { DOCUMENT } from '@angular/common'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { StudentService } from '../Services/StudentService/student.service'
import { EvenimentService } from '../Services/EvenimentService/eveniment.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'

import { Student } from '../Models/student'
import { ChartComponent } from 'ng-apexcharts'
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts'

import { SituatieScolaraService } from '../Services/SituatieScolaraService/situatie-scolara-service.service'
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon'
import * as moment from 'moment'
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap'

export type ChartOptions = {
  series: ApexNonAxisChartSeries
  chart: ApexChart
  responsive: ApexResponsive[]
  labels: any
  fill: {
    colors: ['#60e684', '#e6d460', '#d14141']
  }
}

interface Eveniment {
  examen: string
  procent: number
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
  butDisabled: boolean = false

  name: string
  student: Student = new Student()
  years: number[] = []
  selected: number

  labels: string[] = []
  data: number[] = []

  selectedLabels: string[] = []
  selectedData: number[] = []

  examinari: number[] = []

  evenimente: Eveniment[] = []
  loadingData = false

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
  medieStudent: number[] = []
  medieGenerala: number[] = [8.8, 8.8]

  selectedMedieStudent: number[] = []
  selectedMedieGenerala: number[] = [8.8, 8.8]

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
      console.log(customLabels.length)
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
            }
            // ,
            // {
            //   label: 'Nota finala medie',
            //   data: medieGenerala,
            //   backgroundColor: ['rgba(255, 206, 86, 0.0)'],
            //   borderColor: ['rgba(255,99,132,1)'],
            //   borderWidth: 3,
            //   type: 'line'
            // }
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
    if (this.years.length == 1) {
      this.butDisabled = true
    }
    this.selected = this.years[0]
    this.label = 'Grafic note obtinute in anul ' + this.selected

    var note = await this.situatieScolaraService.getNoteStudent(name)

    this.labels = note.discipline
    this.data = note.medii
    // console.log(this.labels)

    this.selectedLabels.push(this.labels[this.labels.length - 4])
    this.selectedLabels.push(this.labels[this.labels.length - 3])
    this.selectedLabels.push(this.labels[this.labels.length - 2])
    this.selectedLabels.push(this.labels[this.labels.length - 1])

    this.selectedData.push(this.data[this.data.length - 4])
    this.selectedData.push(this.data[this.data.length - 3])
    this.selectedData.push(this.data[this.data.length - 2])
    this.selectedData.push(this.data[this.data.length - 1])

    this.displayLineChart(
      this.label,
      this.selectedLabels,
      this.selectedData,
      this.backgroundColor[0],
      this.borderColor[0]
    )
    this.medieStudent = await this.situatieScolaraService.getMediiStudent(name)

    this.selectedMedieStudent.push(
      this.medieStudent[this.medieStudent.length - 2]
    )
    this.selectedMedieStudent.push(
      this.medieStudent[this.medieStudent.length - 1]
    )

    console.log(this.selectedMedieStudent)

    this.displayBarChart(
      this.barLabel,
      this.barLabels,
      this.medieGenerala,
      this.selectedMedieStudent,
      [this.barBackgroundColor[0], this.barBackgroundColor[1]],
      [this.barBorderColor[0], this.barBorderColor[1]]
    )

    this.examinari = await this.situatieScolaraService.getReexaminariStudent(
      name
    )

    this.displayPieChart2(this.examinari)

    var evenimente = await this.evenimentService.getExameneStudent (
      name
    )
    var discip = await this.programaScolaraService.getDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.student.an,
      2
    )
    console.log(evenimente)
    console.log(discip[1].nume)
    for (var i = 0; i < evenimente.length; i++) {
      var eveniment = {
        examen: discip[i].nume,
        procent: this.getProcents(evenimente[i].start_date.substring(0, 10))
      }

      this.evenimente.push(eveniment)

      // this.evenimente.push(
      //   this.getProcents(evenimente[i].data.substring(0, 10))
      // )
    }

    console.log(this.evenimente)
    this.loadingData = true

    // this.getMedieGenerala(this.student.nume)
    // for(let i=0;i<discip.length;i++)
    // {
    //   this.examene.push(discip[i].nume)
    // }

    // console.log(this.evenimente)
    // console.log(this.examene)
  }

  constructor (
    private studentService: StudentService,
    private situatieScolaraService: SituatieScolaraService,
    private evenimentService: EvenimentService,
    private programaScolaraService: ProgramaScolaraService
  ) {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.getDataForStudent(this.name)
    }, 100)


  }

  ngOnInit (): void { 
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
    var given = moment('2021-04-15', 'YYYY-MM-DD')
    const currentdate = moment().format('YYYY-MM-DD')
    var weeks = moment.duration(given.diff(currentdate)).asWeeks()
    // console.log(currentdate)
    var procents = Math.round((Math.abs(Math.round(weeks)) / 14) * 100)

    return procents.toPrecision(2)
  }
  getProcents (examData) {
    var starting = moment('2021-03-15', 'YYYY-MM-DD')
    var given = moment(examData, 'YYYY-MM-DD')
    const currentdate = moment().format('YYYY-MM-DD')
    var weeksFromStrating = moment
      .duration(starting.diff(currentdate))
      .asWeeks()
    var weeks = moment.duration(given.diff(currentdate)).asWeeks()

    var procents = Math.round(
      (Math.abs(Math.round(weeks)) / Math.abs(weeksFromStrating)) * 100
    ).toPrecision(2)
    return 100 - parseInt(procents)
  }

  yearChangedNote (value) {
    var label = 'Grafic note obtinute in anul ' + value
    var start = 0
    var end = 8

    switch (value) {
      case 1:
        start = 0
        end = 8
        break
      case 2:
        start = 8
        end = 16
        break
      case 3:
        start = 16
        end = 20
        break
    }

    this.selectedLabels = []
    this.selectedData = []

    for (let i = start; i < end; i++) {
      this.selectedLabels.push(this.labels[i])
      this.selectedData.push(this.data[i])
    }

    this.displayLineChart(
      label,
      this.selectedLabels,
      this.selectedData,
      this.backgroundColor[value - 1],
      this.borderColor[value - 1]
    )
  }

  yearChangedEvolutie (value) {
    var label = 'Media mea pe anul ' + value
    var medieGenerala = [7.23, 7.23]
    this.selectedMedieGenerala = []
    switch (value) {
      case 1:
        this.selectedMedieGenerala.push(this.medieStudent[0])
        this.selectedMedieGenerala.push(this.medieStudent[1])
        break
      case 2:
        this.selectedMedieGenerala.push(this.medieStudent[2])
        this.selectedMedieGenerala.push(this.medieStudent[3])
        break
      case 3:
        this.selectedMedieGenerala.push(this.medieStudent[4])
        this.selectedMedieGenerala.push(this.medieStudent[5])
        break
    }

    this.displayBarChart(
      label,
      this.barLabels,
      medieGenerala,
      this.selectedMedieGenerala,
      [this.barBackgroundColor[value + 1], this.barBackgroundColor[value + 2]],
      [this.barBorderColor[value + 1], this.barBorderColor[value + 2]]
    )
  }

  displayPieChart2 (data) {
    this.chartOptions = {
      series: data,

      chart: {
        height: 480,
        width: 680,
        type: 'pie'
      },
      labels: ['Reexaminari', 'Re-reexaminari', 'Examinari'],

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

  // async getNoteGenerale(student, an)
  // {
  //   var medie = await this.situatieScolaraService.getMedieGenerala(student, an);
  //   return medie;
  // }

  // async getMedieGenerala(student)
  // {
  //   var note_1=await this.getNoteGenerale(student,1);
  //   var note_2=await this.getNoteGenerale(student,2);
  //   var note_3=await this.getNoteGenerale(student,3);

  //   console.log(note_1)
  //   console.log(note_2)
  //   console.log(note_3)
  // }
  onTabChanged(event)
  {

    this.selected=this.years[0];
  }

}
