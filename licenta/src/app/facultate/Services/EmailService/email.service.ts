import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Email } from '../../Models/email'
const baseUrl = 'http://localhost:8080/api/licenta/sendEmail'


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  private sendEmail( email:Email,sendTo:string): Observable<any> {
    return this.http.post(`${baseUrl}/email=`+sendTo, email, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  async emailNotification( email:Email,sendTo:string) {
    await this.sendEmail(email,sendTo)
      .subscribe({
        next: data => {
          console.log("POST SUCCESSFULLY! - Send email")
        },
        error: error => {
          console.log("POST ERROR " + error.message);
        }
      });

  }
 
  private sendStudentsEmail(disciplina,grupa,laborator): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=`+disciplina+"/grupa="+grupa+"/laborator="+laborator+"/studenti", {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    })
  }

  async sendEmailtoStudents(disciplina,grupa,laborator ) {
    await this.sendStudentsEmail(disciplina,grupa,laborator)
      .subscribe({
        next: data => {
          console.log("POST SUCCESSFULLY! - Send email to all students")
        },
        error: error => {
          console.log("POST ERROR " + error.message);
        }
      });

  }
}
