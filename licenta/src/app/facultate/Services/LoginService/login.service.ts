import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor (private http: HttpClient) {}

  data;
  public getStudentByEmail (email: any): Observable<any> {
    return this.http.get(`${baseUrl}/students/email=` + email)
  }

  public getProfesorIdByEmail (email: any): Observable<any> {
    return this.http.get(`${baseUrl}/teachers/email=` + email)
  }

  private loginRequest (data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data, { responseType: 'text' })
  }

  public isAuthenticated (): boolean {
    const role = sessionStorage.getItem('role')
    return role == 'student' || role == 'profesor'
  }

  async authenticate (username, password) {
    var jsonReq = { username: username, password: password }
    let loggedIn = true
    let user_role
    await this.loginRequest(jsonReq).subscribe(
      role => {
        console.log('POST authenticate successful', role)
        sessionStorage.setItem('role', role)
        user_role = role
        if (user_role == 'student') {
          this.getStudentByEmail(username).subscribe(val => {

            sessionStorage.setItem('ID', val.id_student)
            sessionStorage.setItem('name', val.nume)
          })
        } else {
          this.getProfesorIdByEmail(username).subscribe(val => {
            sessionStorage.setItem('ID', val.id_profesor)
            sessionStorage.setItem('name', val.nume)
          })
        }
      },
      response => {
        console.log('POST call in error', response)
        sessionStorage.setItem('role', 'wrongCredentials')
        user_role = sessionStorage.getItem('role')
      }
    )
  }

  public isUserLoggedIn () {
    let user = sessionStorage.getItem('role')
    console.log(!(user === null))
    return !(user === null)
  }

  public logOut () {
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('ID')
    sessionStorage.removeItem('name')
  }
}
