import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Disciplina } from '../../Models/disciplina2'


const baseUrl = 'http://localhost:8080/api/licenta/discipline'


@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  data;

  
  public getDisciplina (titlu:String): Observable<Disciplina> {
    return this.http.get<any>(
      `${baseUrl}/titlu=` + titlu
    )
  }

  public  getDisciplinaDetails (titlu:String) {
    return new Promise(resolve => {
      this.getDisciplina(titlu)
      .subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async sendDisciplinaDetails(titlu:String) {
    await this.getDisciplinaDetails(titlu);
    return this.data;
  }

}
