import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Email } from '../../Models/email'
const baseUrl = 'http://localhost:8080/api/licenta/sendEmail'
const qrCodeUrl = 'http://localhost:8080/api/licenta/qrCode'

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private token
  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private sendEmailRequest (email: Email, sendTo: string): Observable<any> {
    return this.http.post(`${baseUrl}/email=` + sendTo, email, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.token)
    })
  }

  async sendEmail (email: Email, sendTo: string) {
    await this.sendEmailRequest(email, sendTo).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Send email')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }

  private sendStudentsEmail (disciplina, grupa, laborator): Observable<any> {
    return this.http.post(
      `${qrCodeUrl}/generate/materie=` +
        disciplina +
        '/grupa=' +
        grupa +
        '/laborator=' +
        laborator,
      '',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  async sendEmailtoStudents (disciplina, grupa, laborator) {
    await this.sendStudentsEmail(disciplina, grupa, laborator).subscribe({
      next: data => {
        console.log(
          'POST SUCCESSFULLY! - Send email to students to validate presence'
        )
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
