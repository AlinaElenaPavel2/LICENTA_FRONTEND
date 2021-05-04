import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Evaluare } from '../../Models/evaluare'

const baseUrl = 'http://localhost:8080/api/licenta/evaluare'
@Injectable({
  providedIn: 'root'
})
export class EvaluareService {
  constructor (private http: HttpClient) {}

  data

  public getProcents (disciplina: String): Observable<Evaluare> {
    return this.http.get<any>(`${baseUrl}/disciplina=` + disciplina)
  }

  public getProcentsDetails (disciplina: String) {
    return new Promise(resolve => {
      this.getProcents(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async sendProcentsDetails (disciplina: String) {
    await this.getProcentsDetails(disciplina)
    return this.data
  }
}
