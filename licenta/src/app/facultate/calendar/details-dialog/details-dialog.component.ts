import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'

import * as moment from 'moment'

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  descriere
  eveniment
  start_date
  start_hour
  end_date
  end_hour

  constructor (
    public dialog: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogModel
  ) {
    this.descriere=data.descriere
    this.eveniment = data.eveniment
    var start = moment(this.eveniment.start)
    var end = moment(this.eveniment.end)

    //   console.log(start)
    // console.log(end)

    this.start_date = start.format('L')
    this.start_hour = start.format('LT')

    // console.log(this.start_date)
    // console.log(this.start_hour)

    this.end_date = end.format('L')
    this.end_hour = end.format('LT')
  }

  ngOnInit (): void {}

  onClick (): void {
    this.dialog.close()
  }
}

export class DetailsDialogModel {
  constructor (public eveniment,public descriere) {}
}
