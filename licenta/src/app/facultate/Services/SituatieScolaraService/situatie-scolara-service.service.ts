import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/situatieScolara'
const reexaminariUrl = 'http://localhost:8080/api/licenta/reexaminari'

@Injectable({
  providedIn: 'root'
})
export class SituatieScolaraService {
  private data
  private token
  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private getNoteRequest (student: String): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/student=` + student + '/medii/discipline',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  private getMediiRequest (student: String): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/student=` + student + '/medii/semestre',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  private getReexaminariRequest (student: String): Observable<any> {
    return this.http.get<any>(`${reexaminariUrl}/student=` + student + '/tip', {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  private getMedieGeneralaRequest (
    student: string,
    an: number
  ): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/student=` + student + '/an=' + an + '/medii',
      {
        headers: new HttpHeaders().set('Authorization', this.token)
      }
    )
  }

  public getNote (student: String) {
    return new Promise(resolve => {
      this.getNoteRequest(student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async getNoteStudent (student: String) {
    await this.getNote(student)
    return this.data
  }

  public getMedii (student: String) {
    return new Promise(resolve => {
      this.getMediiRequest(student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  async getMediiStudent (student: String) {
    await this.getMedii(student)
    return this.data
  }

  public getReexCount (student: String) {
    return new Promise(resolve => {
      this.getReexaminariRequest(student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }

  async getReexaminariStudent (student: String) {
    await this.getReexCount(student)
    return this.data
  }

  async getMedieGenerala (student: string, an: number) {
    await new Promise(resolve => {
      this.getMedieGeneralaRequest(student, an).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
