import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core'
import * as Chart from 'chart.js'
import { DOCUMENT } from '@angular/common'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { StudentService } from '../Services/StudentService/student.service'
import { EvenimentService } from '../Services/EvenimentService/eveniment.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { EvaluareService } from '../Services/EvaluareService/evaluare.service'

import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { Disciplina } from '../Models/disciplina2'
import { Profesor } from '../Models/profesor'
import { Student } from '../Models/student'
import { Evaluare } from '../Models/evaluare'
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
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler'

interface Eveniment {
  examen: string
  procent: number
}

@Component({
  selector: 'app-statistics-profesor',
  templateUrl: './statistics-profesor.component.html',
  styleUrls: ['./statistics-profesor.component.css']
})
export class StatisticsProfesorComponent implements OnInit {
  @ViewChild('barChartProfesor', { static: true })
  barChartProfesor: ElementRef<HTMLCanvasElement>
  private ctxBar: CanvasRenderingContext2D

  evenimente: Eveniment[] = []
  loadingData = false
  chartLoaded:boolean=true
  discipline: Disciplina[] = []
  profesor: Profesor = new Profesor()
  evaluare: string
  displayed: string[] = []
  userName: string
  userRole: string
  selectedLabels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  selectedData: number[] = []
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
  displayBarChart (barLabel, labels, range) {
    setTimeout(() => {
      this.ctxBar = this.barChartProfesor.nativeElement.getContext('2d')
    }, 100)
    setTimeout(() => {
      var myBarChart = new Chart(this.ctxBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: barLabel,
              data: range,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 4
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

  async getDataForProfesor (name) {
    var prof = await this.profesorService.getProfesor(
      name
    )
    this.profesor.setComponents(
      prof.id_profesor,
      prof.nume,
      prof.email,
      prof.telefon,
      prof.functia
    )

    this.discipline = await this.programaScolaraService.getDisciplineTitular(
      this.profesor.nume
    )
    var eveniment = await this.evenimentService.getExamenDisciplina(
      this.discipline[0].nume
    )

    var evenimentDisplayed = {
      examen: this.discipline[0].nume,
      procent: this.getProcents(eveniment.start_date.substring(0, 10))
    }

    this.evenimente.push(evenimentDisplayed)
    this.loadingData = true
    var pond = await this.evaluareService.getProcentsDetails(
      this.discipline[0].nume
    )

    if (pond.pondere_lab != null) {
      var string = 'laborator'
      this.displayed.push(string)
    }

    if (pond.pondere_partial != null) {
      var string = 'partial '
      this.displayed.push(string)
    }
    if (pond.pondere_examen != null) {
      var string = 'examen'
      this.displayed.push(string)
    }
    if (pond.pondere_proiect != null) {
      var string = 'proiect'
      this.displayed.push(string)
    }
    this.displayed.push('medie finala')

    // this.displayLineChart(
    //   this.label,
    //   this.selectedLabels,
    //   this.selectedData,
    //   this.backgroundColor[0],
    //   this.borderColor[0]
    // )
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

  constructor (
    private studentService: StudentService,
    private situatieScolaraService: SituatieScolaraService,
    private evenimentService: EvenimentService,
    private programaScolaraService: ProgramaScolaraService,
    private profesorService: ProfesorService,
    private evaluareService: EvaluareService
  ) {
    setTimeout(async () => {
      this.userRole = sessionStorage.getItem('role')
      this.userName = sessionStorage.getItem('name')

      this.getDataForProfesor(this.userName)
    }, 100)
  }

  ngOnInit (): void {}
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
    var given = moment('2021-03-15', 'YYYY-MM-DD')
    const currentdate = moment().format('YYYY-MM-DD')
    var weeks = moment.duration(given.diff(currentdate)).asWeeks()
    var procents = Math.round((Math.abs(Math.round(weeks)) / 14) * 100)

    return procents.toPrecision(2)
  }

  async evaluareChanged (evaluare) {
    this.selectedData.length = 0
    console.log(evaluare)
    if (evaluare != 'medie finala') {
      var note = await this.evaluareService.getDistributieNote(
        this.discipline[0].nume,
        evaluare
      )
    } else {
      var note = await this.evaluareService.getDistributieMedieFianala(
        this.discipline[0].nume
      )
    }
    console.log(note)
    this.getSelectedData(note)
    console.log(this.selectedData)
    this.displayBarChart(
      'Distributie note',
      this.selectedLabels,
      this.selectedData
    )
    this.chartLoaded=false
  }

  getSelectedData (note) {
    for (let i = 0; i < this.selectedLabels.length; i++) {
      this.selectedData.push(note[i])
    }
  }
}
