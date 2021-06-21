import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Prezenta } from '../../Models/prezenta'

const baseUrl = 'http://localhost:8080/api/licenta/prezenta'

@Injectable({
  providedIn: 'root'
})
export class PrezentaService {
  data
  constructor (private http: HttpClient) {}

  public getPrezByDisciplinaStudent (
    disciplina: string,
    studentName: string
  ): Observable<Prezenta[]> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/student=' + studentName
    )
  }

  async getPrezente (disciplina: string, studentName: string) {
    await new Promise(resolve => {
      this.getPrezByDisciplinaStudent(disciplina, studentName).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
    return this.data
  }

  private addPrezentaRequest (disciplina, student,laborator,durata): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=` + disciplina+"/student="+student+"/laborator="+laborator+"/durata="+durata, "")
  }

 
  async addPrezenta (disciplina, student,laborator,durata) {
    await this.addPrezentaRequest(disciplina, student,laborator,durata).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Added prezenta')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }

  private addPrezentaRecuperariRequest (disciplina, student,laborator,durata): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=` + disciplina+"/student="+student+"/laborator="+laborator+"/durata="+durata+"/recuperat", "")
  }

  
  async addPrezentaRecuperari (disciplina, student,laborator,durata) {
    await this.addPrezentaRecuperariRequest(disciplina, student,laborator,durata).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Added prezenta')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
