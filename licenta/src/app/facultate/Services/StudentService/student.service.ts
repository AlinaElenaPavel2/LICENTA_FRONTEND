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


  private getStudenttiByGrupaRequest (disciplina:string,profesor:string): Observable<Student[]> {
    return this.http.get<any>(`${discipUrl}/titlu=` + disciplina+"/profesor="+profesor+"/studenti")
  }

  
  async getStudentiDetails (disciplina:string,profesor:string) {
    await new Promise(resolve => {
      this.getStudenttiByGrupaRequest(disciplina, profesor).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
    return this.data
  }

  private getPrezenteByStudentiRequest (disciplina:string,student:string): Observable<Student[]> {
    return this.http.get<any>(`${discipUrl}/titlu=` + disciplina+"/student="+student+"/prezente")
  }

  
  async getPrezente (disciplina:string,student:string) {
    await new Promise(resolve => {
      this.getPrezenteByStudentiRequest(disciplina,student).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
    return this.data
  }

}
