import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/fileStorage'

const materialeUrl = 'http://localhost:8080/api/licenta/materiale'

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  data
  constructor (private http: HttpClient) {}

  private getFiles (disciplina, tip): Observable<any> {
    return this.http.get<any>(`${baseUrl}/` + disciplina + '/' + tip)
  }

  private getLinks (disciplina): Observable<any> {
    return this.http.get<any>(`${materialeUrl}/disciplina=` + disciplina)
  }

  private getDescriptionRequest (disciplina, tip): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/` + disciplina + '/' + tip + '/descriptions'
    )
  }

  async getFilesForDisciplineComponent (disciplina, tip) {
    await new Promise(resolve => {
      this.getFiles(disciplina, tip).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  async getLinksForDisciplineComponent (disciplina) {
    await new Promise(resolve => {
      this.getLinks(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  async getDescriptionForComponent (disciplina, tip) {
    await new Promise(resolve => {
      this.getDescriptionRequest(disciplina, tip).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private addLink (disciplina, link): Observable<any> {
    return this.http.post(
      `${materialeUrl}/disciplina=` + disciplina,
      JSON.stringify(link),
      this.httpOptions
    )
  }

  private addBook (disciplina, tip, book): Observable<any> {
    return this.http.post(
      `${materialeUrl}/disciplina=` + disciplina + '/tip=' + tip,
      JSON.stringify(book),
      this.httpOptions
    )
  }

  async postareLink (link, disciplina: string) {
    console.log(link)
    await this.addLink(disciplina, link).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Send link')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }

  async postareBook (disciplina, tip, book) {
    console.log(book)
    await this.addBook(disciplina, tip, book).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Send book')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
