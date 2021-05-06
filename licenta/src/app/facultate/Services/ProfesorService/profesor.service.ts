import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Profesor } from '../../Models/profesor'

const baseUrl = 'http://localhost:8080/api/licenta/teachers'

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }
  private data;
  public getProfesorById (id:number): Observable<Profesor> {
    return this.http.get<any>(
      `${baseUrl}/` +id
    )
  }

  public  getProfesorDetails (id:number) {
    return new Promise(resolve => {
      this.getProfesorById(id)
      .subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async sendProfesorDetails(id:number) {
    await this.getProfesorDetails(id);
    return this.data;
  }
}
