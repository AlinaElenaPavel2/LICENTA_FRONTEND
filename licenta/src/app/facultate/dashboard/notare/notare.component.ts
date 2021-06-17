import { Component, OnInit, Inject } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'

@Component({
  selector: 'app-notare',
  templateUrl: './notare.component.html',
  styleUrls: ['./notare.component.css']
})
export class NotareComponent implements OnInit {
  studentName: string
  grupa: string

  constructor (
    public dialog: MatDialogRef<NotareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotareDialogModel
  ) {
    this.studentName = data.student
    this.grupa = data.grupa

  }
  ngOnInit (): void {}

  onClick (): void {
    this.dialog.close()
  }
}
export class NotareDialogModel {
  constructor (public student,public grupa) {}
}
