import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../../Models/student'

const baseUrl = 'http://localhost:8080/api/licenta/students'
const discipUrl = 'http://localhost:8080/api/licenta/disciplina'
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private data
  private token = sessionStorage.getItem('token')
  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private getStudentByName (name): Observable<Student> {
    return this.http.get<any>(`${baseUrl}/fullname=` + name, {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  private getStudentById (id): Observable<Student> {
    return this.http.get<any>(`${baseUrl}/` + id, {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  private getStudentDetails (name) {
    return new Promise(resolve => {
      this.getStudentByName(name).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  private getStudentDetailsById (id) {
    return new Promise(resolve => {
      this.getStudentById(id).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  async sendStudentDetails (name) {
    await this.getStudentDetails(name)
    return this.data
  }

  async sendStudentDetailsById (id) {
    await this.getStudentDetailsById(id)
    return this.data
  }

  private getStudenttiByGrupaRequest (
    disciplina: string,
    profesor: string
  ): Observable<Student[]> {
    return this.http.get<any>(
      `${discipUrl}/titlu=` +
        disciplina +
        '/profesor=' +
        profesor +
        '/studenti',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  async getStudentiDetails (disciplina: string, profesor: string) {
    await new Promise(resolve => {
      this.getStudenttiByGrupaRequest(disciplina, profesor).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  private getPrezenteByStudentiRequest (
    disciplina: string,
    student: string
  ): Observable<Student[]> {
    return this.http.get<any>(
      `${discipUrl}/titlu=` + disciplina + '/student=' + student + '/prezente',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  async getPrezente (disciplina: string, student: string) {
    await new Promise(resolve => {
      this.getPrezenteByStudentiRequest(disciplina, student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
