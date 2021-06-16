import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Laborator } from '../../Models/laborator'


const baseUrl = 'http://localhost:8080/api/licenta/laborator'

@Injectable({
  providedIn: 'root'
})
export class LaboratorService {
  constructor (private http: HttpClient) {}

  data

  public getProfLaborator (
    disciplina: String,
    grupa: String
  ): Observable<Laborator> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/grupa=' + grupa
    )
  }

  public getGrupeRequest (
    disciplina: String,
    profesor: String
  ): Observable<Laborator> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/profesor=' + profesor
    )
  }
  public getProfLaboratorDetails (disciplina: String, grupa: String) {
    return new Promise(resolve => {
      this.getProfLaborator(disciplina, grupa).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async setProfLaboratorDetails (disciplina: String, grupa: String) {
    await this.getProfLaboratorDetails(disciplina, grupa)
    return this.data
  }

  async getGrupe (   disciplina: string,
    profesor: string) {
    await new Promise(resolve => {
      this.getGrupeRequest(disciplina,profesor).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
