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
  data

  private getStudentByName (name): Observable<Student> {

    return this.http.get<any>(`${baseUrl}/fullname=` + name)
  }

  private getStudentById (): Observable<Student> {
    return this.http.get<any>(`${baseUrl}/id=` + sessionStorage.getItem('ID'))
  }

  private getStudentDetails (name) {
    return new Promise(resolve => {
      this.getStudentByName(name).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  private getStudentDetailsById () {
    return new Promise(resolve => {
      this.getStudentById().subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  async sendStudentDetails (name) {
    await this.getStudentDetails(name)
    return this.data
  }

  async sendStudentDetailsById () {
    await this.getStudentDetailsById()
    return this.data
  }
}
