import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Disciplina } from '../../Models/Disciplina'

const baseUrl = 'http://localhost:8080/api/licenta/programaScolara'


@Injectable({
  providedIn: 'root'
})
export class ProgramaScolaraService {
  data;
  constructor(private http: HttpClient) { }

  public getDiscipline (programStudii:String,specializare:String,an:number): Observable<Disciplina[]> {
    return this.http.get<any>(
      `${baseUrl}/programStudii=` + programStudii+'/specializare='+specializare+'/an='+an+'/semestru=2'
    )
  }

  public  getDisciplineDetails (programStudii:String,specializare:String,an:number) {
    return new Promise(resolve => {
      this.getDiscipline(programStudii,specializare,an)
      .subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async sendDisciplineDetails(programStudii:String,specializare:String,an:number) {
    await this.getDisciplineDetails(programStudii,specializare,an);
    // console.log(this.data)
    return this.data;
  }

}
