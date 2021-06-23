import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Laborator } from '../../Models/laborator'

const baseUrl = 'http://localhost:8080/api/licenta/laborator'

@Injectable({
  providedIn: 'root'
})
export class LaboratorService {
  private data
  private token

  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private getProfLaborator (
    disciplina: String,
    grupa: String
  ): Observable<Laborator> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/grupa=' + grupa,
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  private getGrupeRequest (
    disciplina: String,
    profesor: String
  ): Observable<Laborator> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina + '/profesor=' + profesor,
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }
  public async getProfLaboratorDetails (disciplina: String, grupa: String) {
    await new Promise(resolve => {
      this.getProfLaborator(disciplina, grupa).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
  // async setProfLaboratorDetails (disciplina: String, grupa: String) {
  //   await this.getProfLaboratorDetails(disciplina, grupa)
  //   return this.data
  // }

  async getGrupe (disciplina: string, profesor: string) {
    await new Promise(resolve => {
      this.getGrupeRequest(disciplina, profesor).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
