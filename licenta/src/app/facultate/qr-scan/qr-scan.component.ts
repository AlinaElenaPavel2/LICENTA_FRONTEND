import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as moment from 'moment';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements OnInit {
  disciplinaName: string
  student: string
  laborator: string

  constructor (
    private _Activatedroute: ActivatedRoute

  ) {}
  sub
  ngOnInit (): void {
    const currentdate = moment().format("YYYY-MM-DD HH:mm");

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.disciplinaName = params.get('name')
      this.student = params.get('student')
      this.laborator = params.get('laborator')

    })
    console.log(this.disciplinaName)
    console.log(this.student)
    console.log(this.laborator)
    console.log(currentdate)

  }
}
