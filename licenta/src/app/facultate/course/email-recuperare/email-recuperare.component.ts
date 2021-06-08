import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, FormControl } from '@angular/forms'
import { Email } from 'src/app/facultate/Models/email'
import {EmailService} from 'src/app/facultate/Services/EmailService/email.service'

@Component({
  selector: 'app-email-recuperare',
  templateUrl: './email-recuperare.component.html',
  styleUrls: ['./email-recuperare.component.css']
})
export class EmailRecuperareComponent implements OnInit {
  profesor_email: string
  email: Email = new Email()

  sendEmail = new FormGroup({
    titlu: new FormControl(''),
    mesaj: new FormControl(''),
    dataRecuperare:new FormControl('')
  })


  constructor (
    public dialog: MatDialogRef<EmailRecuperareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailRecuperareModel,
    private emailService:EmailService
  ) {
    this.profesor_email = data.email_profesor
  }

  ngOnInit (): void {}

  async onSubmit () {
    console.warn(this.sendEmail.value.dataRecuperare)

    console.log('---------')
    console.warn(this.sendEmail.value)
    this.dialog.close()
    this.email.setComponents(this.sendEmail.value.titlu,this.sendEmail.value.mesaj)

    console.log(this.profesor_email)

    console.log(this.email)
    // await this.emailService.emailNotification(this.email,this.profesor_email);

  }
}

export class EmailRecuperareModel {
  constructor (public email_profesor: string) {}
}
