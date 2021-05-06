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

  private getPhotoRequest (id: number): Observable<any> {
    return this.http.get(`${baseUrl}/profilePicture/user/id=` + id,  {responseType: 'text'});
  }

  public async getProfilePicture (id: number) {
    await new Promise(resolve => {
      this.getPhotoRequest(id).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  private storePhotoRequest (id: number, encodedImg: string): Observable<any> {
    console.log("POST REQUEST")
    console.log(encodedImg)

    return this.http.post(
      `${baseUrl}/uploadProfilePicture/user/id=` + id,
      encodedImg,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/plain')
      });
  
  }

  async storeProfilePhoto (id: number, encodedImg) {
    await this.storePhotoRequest(id, encodedImg).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Store profile picture')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }
}
