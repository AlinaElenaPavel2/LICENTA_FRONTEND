import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/evenimente'

@Injectable({
  providedIn: 'root'
})
export class EvenimentService {

  constructor(private http: HttpClient) { }
  data;

  public getExameneRequest (student: String): Observable<any> {
    return this.http.get<any>(`${baseUrl}/student=` + student)
  }

  public getExameneEveniment (student: String) {
    return new Promise(resolve => {
      this.getExameneRequest(student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async  getExameneEvenimentStudent (student: String) {
    await this.getExameneEveniment(student)
    return this.data
  }

}
