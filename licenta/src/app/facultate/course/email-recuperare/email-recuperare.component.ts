import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms'
import { RecuperariService } from 'src/app/facultate/Services/RecuperariService/recuperari.service'
import { NotifierService } from 'angular-notifier'

import * as moment from 'moment'

@Component({
  selector: 'app-email-recuperare',
  templateUrl: './email-recuperare.component.html',
  styleUrls: ['./email-recuperare.component.css']
})
export class EmailRecuperareComponent implements OnInit {
  profesor_email: string

  laboratoare: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  grupe: string[] = ['1306', '1307', '1308']
  studentName: string
  disciplina: string
  private notifier: NotifierService

  sendEmail = new FormGroup({
    laborator: new FormControl(''),
    grupa: new FormControl(''),
    dataRecuperare: new FormControl('')
  })

  constructor (
    public dialog: MatDialogRef<EmailRecuperareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailRecuperareModel,
    private recuperariServici: RecuperariService,
    notifier: NotifierService
  ) {
    this.notifier=notifier
    this.profesor_email = data.email_profesor
    this.disciplina = data.disciplina
  }

  ngOnInit (): void {}

  async onSubmit () {
    const format1 = 'YYYY-MM-DD'
    console.log(moment(this.sendEmail.value.dataRecuperare).format(format1))
    console.log('---------')
    this.studentName = sessionStorage.getItem('name')

    this.dialog.close()

    // console.log(this.profesor_email)
    var email = {
      laborator: this.sendEmail.value.laborator,
      grupa: this.sendEmail.value.grupa,
      data: moment(this.sendEmail.value.dataRecuperare).format(format1)
    }
    console.log(this.disciplina)
    console.log(this.studentName)
    console.log(email)
    await this.recuperariServici.addRecuperare(
      this.disciplina,
      this.studentName,
      email
    )
    this.notifier.notify('success', 'Cererea a fost trimisa cu succes!')
  }
}

export class EmailRecuperareModel {
  constructor (public email_profesor: string, public disciplina: string) {}
}
