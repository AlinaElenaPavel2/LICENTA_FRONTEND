import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../../Models/student'

const baseUrl = 'http://localhost:8080/api/licenta/students'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor (private http: HttpClient) {}
  data;

  private getStudentByName (): Observable<Student> {
    return this.http.get<any>(
      `${baseUrl}/fullname=` + sessionStorage.getItem('name')
    ) 
  }

  
  private getStudentById (): Observable<Student> {
    return this.http.get<any>(
      `${baseUrl}/id=` + sessionStorage.getItem('ID')
    ) 
  }

  private getStudentDetails () {
    return new Promise(resolve => {
      this.getStudentByName()
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  private getStudentDetailsById () {
    return new Promise(resolve => {
      this.getStudentById()
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  async sendStudentDetails() {
    await this.getStudentDetails();
    return this.data;
  }

  async sendStudentDetailsById() {
    await this.getStudentDetailsById();
    return this.data;
  }
}
