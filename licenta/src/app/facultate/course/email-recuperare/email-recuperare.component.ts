import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms'
import { Email } from 'src/app/facultate/Models/email'
import { EmailService } from 'src/app/facultate/Services/EmailService/email.service'
import * as moment from 'moment'

@Component({
  selector: 'app-email-recuperare',
  templateUrl: './email-recuperare.component.html',
  styleUrls: ['./email-recuperare.component.css']
})
export class EmailRecuperareComponent implements OnInit {
  profesor_email: string
  email: Email = new Email()
  laboratoare: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  sendEmail = new FormGroup({
    titlu: new FormControl(''),
    mesaj: new FormControl(''),
    laborator: new FormControl(''),
    dataRecuperare: new FormControl('')
  })

  constructor (
    public dialog: MatDialogRef<EmailRecuperareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailRecuperareModel,
    private emailService: EmailService
  ) {
    this.profesor_email = data.email_profesor
  }

  ngOnInit (): void {}

  async onSubmit () {
    // console.log(this.sendEmail.value.dataRecuperare)
    const format1 = 'YYYY-MM-DD HH:mm:ss'
    console.log(moment(this.sendEmail.value.dataRecuperare).format(format1))
    console.log('---------')
    console.log(this.sendEmail.value)
    this.dialog.close()
    this.email.setComponents(
      this.sendEmail.value.titlu,
      this.sendEmail.value.mesaj
    )

    // console.log(this.profesor_email)
    var email = {
      titlu: this.sendEmail.value.titlu,
      descriere: this.sendEmail.value.mesaj,
      laborator: this.sendEmail.value.laborator,
      data: moment(this.sendEmail.value.dataRecuperare).format(format1)
    }
    console.log(email)

    // console.log(this.email)
    // await this.emailService.emailNotification(this.email,this.profesor_email);
  }
}

export class EmailRecuperareModel {
  constructor (public email_profesor: string) {}
}
