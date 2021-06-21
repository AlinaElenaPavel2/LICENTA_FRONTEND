import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as moment from 'moment'
import { PrezentaService } from '../Services/PrezentaService/prezenta.service'

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements OnInit {
  disciplinaName: string
  student: string
  laborator: string
  data: string
  ora: string
  success: boolean = false

  constructor (
    private _Activatedroute: ActivatedRoute,
    private prezenteService: PrezentaService,
    private router: Router
  ) {}
  sub
  ngOnInit (): void {
    const format1 = 'YYYY-MM-DD HH:mm:ss'
    const currentdateMom = moment()

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.disciplinaName = params.get('name')
      this.student = params.get('student')
      this.laborator = params.get('laborator')
      this.data = params.get('data')
      this.ora = params.get('ora')
    })

    var arr = this.data.split('_')
    var dateFormat =
      arr[0] +
      '-' +
      arr[1] +
      '-' +
      arr[2] +
      ' ' +
      this.ora.split(':')[0] +
      ':' +
      this.ora.split(':')[1]
    const sendingTime = moment(dateFormat)

    var minutes = moment.duration(currentdateMom.diff(sendingTime)).asMinutes()
    console.log('DIFERENTA')
    console.log(Math.round(minutes))
    if (Math.round(minutes) < 10) {
      this.success = true
    }
    this.addPrezenta(
      this.disciplinaName,
      this.student,
      this.laborator,
      Math.round(minutes)
    )
    console.log(this.disciplinaName)
    console.log(this.student)
    console.log(this.laborator)
    console.log('----------------')
    console.log(sendingTime)
    console.log(currentdateMom)
    if (this.router.url.split('/')[12] == 'recuperare') {
      this.addPrezentaRecuperari(
        this.disciplinaName,
        this.student,
        this.laborator,
        Math.round(minutes)
      )
    }
  }

  async addPrezenta (disciplina, student, laborator, durata) {
    await this.prezenteService.addPrezenta(
      disciplina,
      student,
      laborator,
      durata
    )
  }

  async addPrezentaRecuperari (disciplina, student, laborator, durata) {
    await this.prezenteService.addPrezentaRecuperari(
      disciplina,
      student,
      laborator,
      durata
    )
  }
}
