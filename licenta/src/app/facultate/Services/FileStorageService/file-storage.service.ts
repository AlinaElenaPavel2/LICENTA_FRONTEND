import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/fileStorage'

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
data;
  constructor(private http: HttpClient) { }

  private getFiles( disciplina,tip): Observable<any> {
    return this.http.get<any>(`${baseUrl}/`+disciplina+"/"+ tip);
  }

  async getFilesForDisciplineComponent(disciplina,tip) {
    await new Promise(resolve => {
      this.getFiles(disciplina,tip).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
    return this.data
  }
}
