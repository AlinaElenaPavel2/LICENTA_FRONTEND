import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from '../../Models/student'

const baseUrl = 'http://localhost:8080/api/licenta/fileStorage'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor (private http: HttpClient) {}
  data

  private getUploadFileRequest (file): Observable<any> {
    return this.http.post(`${baseUrl}/status`, file, {
      headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    })
  }

  async uploadFile (file) {
    await new Promise(resolve => {
      this.getUploadFileRequest(file).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
