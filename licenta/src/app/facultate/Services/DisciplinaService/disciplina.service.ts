import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Disciplina } from '../../Models/disciplina2'

const baseUrl = 'http://localhost:8080/api/licenta/discipline'

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private data
  private token
  constructor (private http: HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private getDisciplina (titlu: String): Observable<Disciplina> {
    return this.http.get<any>(`${baseUrl}/titlu=` + titlu, {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  async getDisciplinaDetails (titlu: String) {
    await new Promise(resolve => {
      this.getDisciplina(titlu).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
  // async sendDisciplinaDetails (titlu: String) {
  //   await this.getDisciplinaDetails(titlu)
  //   return this.data
  // }
}
