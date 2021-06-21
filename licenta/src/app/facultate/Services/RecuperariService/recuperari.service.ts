import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/recuperare'

@Injectable({
  providedIn: 'root'
})
export class RecuperariService {
  constructor (private http: HttpClient) {}
  data
  public getRecuperariRequest (
    disciplina: string,
    profesor: string
  ): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/profesor=' + profesor
    )
  }

  async getRecuperari (disciplina: string, profesor: string) {
    await new Promise(resolve => {
      this.getRecuperariRequest(disciplina, profesor).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  private setResponseRequest (id, response): Observable<any> {
    return this.http.post(`${baseUrl}/` + id + '/response=' + response, '')
  }

  private addRecuperareRequest (disciplina, student,recuperare): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=` + disciplina + '/student=' + student, recuperare)
  }

  async setResponse (id, response) {
    await this.setResponseRequest(id, response).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Set response')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }

  async addRecuperare (disciplina, student,recuperare) {
    await this.addRecuperareRequest(disciplina, student,recuperare).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Adaugare cerere')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
