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
  time: string
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
      this.time = params.get('time')
    })

    var currentTime=moment().valueOf()
    var diff=currentTime-parseInt(this.time)
    var d = moment.duration(diff, 'milliseconds');
    var minutes = Math.floor(d.asMinutes());
    console.log(minutes)
    if (Math.round(minutes) < 10) {
      this.success = true
    }
    this.addPrezenta(
      this.disciplinaName,
      this.student,
      this.laborator,
      Math.round(minutes)
    )
  
  
    if (this.router.url.split('/')[9] == 'recuperare') {
      console.log("RECUPERAT")
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
