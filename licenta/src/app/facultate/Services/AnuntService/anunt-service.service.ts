import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/anunturi'

@Injectable({
  providedIn: 'root'
})
export class AnuntService {

  constructor(private http: HttpClient) { }

  data;

  public getAnunturiRequest (disciplina:string,grupa:string): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/disciplina=` + disciplina+"/grupa="+grupa
    )
  }
  private addAnunturiRequest (disciplina, grupa,anunt): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=` + disciplina+"/grupa="+grupa, anunt, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  async getAnunturi (disciplina:string,grupa:string) {
    await new Promise(resolve => {
      this.getAnunturiRequest(disciplina,grupa).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  async addAnunt (disciplina, grupa,anunt) {
    await this.addAnunturiRequest(disciplina, grupa,anunt).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Added anunt')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
