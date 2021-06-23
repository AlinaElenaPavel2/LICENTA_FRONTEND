import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Evaluare } from '../../Models/evaluare'
import { Catalog } from '../../Models/catalog'

const baseUrl = 'http://localhost:8080/api/licenta/evaluare'
const catalogUrl = 'http://localhost:8080/api/licenta/catalog'

@Injectable({
  providedIn: 'root'
})
export class EvaluareService {
  private data
  private token
  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private getProcents (disciplina: String): Observable<Evaluare> {
    return this.http.get<any>(`${baseUrl}/disciplina=` + disciplina, {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  private getdistributieNoteRequest (
    disciplina: string,
    tip: string
  ): Observable<Evaluare> {
    return this.http.get<any>(
      `${catalogUrl}/disciplina=` + disciplina + '/tip=' + tip,
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }
  private getdistributieMedieFinalaRequest (
    disciplina: string
  ): Observable<Evaluare> {
    return this.http.get<any>(
      `${catalogUrl}/disciplina=` + disciplina + '/medieFinala',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  public async getProcentsDetails (disciplina: String) {
    await new Promise(resolve => {
      this.getProcents(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
  // async sendProcentsDetails (disciplina: String) {
  //   await this.getProcentsDetails(disciplina)
  //   return this.data
  // }

  private getNoteRequest (
    disciplina: string,
    student: string
  ): Observable<Catalog> {
    return this.http.get<Catalog>(
      `${catalogUrl}/disciplina=` +
        disciplina +
        '/student=' +
        student +
        '/note',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  async getNote (disciplina: string, student: string) {
    await new Promise(resolve => {
      this.getNoteRequest(disciplina, student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  private updateNoteRequest (student, disciplina, note): Observable<any> {
    return this.http.put(
      `${catalogUrl}/student=` + student + '/disciplina=' + disciplina,
      note,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', this.token),
        responseType: 'json'
      }
    )
  }

  async updateNote (student, disciplina, note) {
    await this.updateNoteRequest(student, disciplina, note).subscribe({
      next: data => {
        console.log('PUT SUCCESSFULLY! - Updated note')
      },
      error: error => {
        console.log('PUT ERROR ' + error.message)
      }
    })
  }

  async getDistributieNote (disciplina: string, tip: string) {
    await new Promise(resolve => {
      this.getdistributieNoteRequest(disciplina, tip).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  async getDistributieMedieFianala (disciplina: string) {
    await new Promise(resolve => {
      this.getdistributieMedieFinalaRequest(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
