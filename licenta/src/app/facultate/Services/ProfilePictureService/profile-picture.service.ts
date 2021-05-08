import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/fileStorage'

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  private data
  constructor (private http: HttpClient) {}

  private getPhotoRequest (role:string,id: number): Observable<any> {
    return this.http.get(`${baseUrl}/profilePicture/user/role=` + role+"/id="+id, {
      responseType: 'text'
    })
  }

  public async getProfilePicture (role:string,id: number) {
    await new Promise(resolve => {
      // this.getPhotoRequest(id).subscribe(data => {
      //   this.data = data
      //   resolve(this.data)
      // })
      this.getPhotoRequest(role,id).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        },
        err => {
          this.data = null
          resolve(this.data)
          console.log('HTTP request error.')
        },
        () => console.log('HTTP request completed.')
      )
    })
    return this.data
  }

  private storePhotoRequest (role:string,id: number, encodedImg: string): Observable<any> {
    console.log('POST REQUEST')
    console.log(encodedImg)

    return this.http.post(
      `${baseUrl}/uploadProfilePicture/user/role=`+role+"/id=" + id,
      encodedImg,
      {
        headers: new HttpHeaders().set('Content-Type', 'text/plain'),
        responseType: 'text'
      }
    )
  }

  async storeProfilePhoto (role:string,id: number, encodedImg) {
    await this.storePhotoRequest(role,id,encodedImg).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Store profile picture')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
