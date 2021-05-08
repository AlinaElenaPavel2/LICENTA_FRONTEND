import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { async, Observable } from 'rxjs'
import { Disciplina } from '../../Models/disciplina2'

const baseUrl = 'http://localhost:8080/api/licenta/programaScolara'
const discipUrl = 'http://localhost:8080/api/licenta/discipline'
@Injectable({
  providedIn: 'root'
})
export class ProgramaScolaraService {
  data
  constructor (private http: HttpClient) {}

  public getDiscipline (
    programStudii: String,
    specializare: String,
    an: number,
    semestru: number
  ): Observable<Disciplina[]> {
    return this.http.get<any>(
      `${baseUrl}/programStudii=` +
        programStudii +
        '/specializare=' +
        specializare +
        '/an=' +
        an +
        '/semestru=' +
        semestru
    )
  }

  public getDisciplineDetails (
    programStudii: String,
    specializare: String,
    an: number,
    semestru: number
  ) {
    return new Promise(resolve => {
      this.getDiscipline(programStudii, specializare, an, semestru).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
  }
  async sendDisciplineDetails (
    programStudii: String,
    specializare: String,
    an: number,
    semestru: number
  ) {
    await this.getDisciplineDetails(programStudii, specializare, an, semestru)
    return this.data
  }

  public getDisciplineTitularRequest (
    titular: string
  ): Observable<Disciplina[]> {
    return this.http.get<any>(`${discipUrl}/titular/nume=` + titular)
  }

  public async getDisciplineTitular (titular: string) {
    await new Promise(resolve => {
      this.getDisciplineTitularRequest(titular).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
