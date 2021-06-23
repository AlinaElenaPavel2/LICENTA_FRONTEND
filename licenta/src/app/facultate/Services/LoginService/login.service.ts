import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta'
const loginUrl = 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor (private http: HttpClient) {}

  private data
  private token

  private getStudentByEmail (email: any): Observable<any> {
    return this.http.get(`${baseUrl}/students/email=` + email, {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  private getProfesorIdByEmail (email: any): Observable<any> {
    return this.http.get(`${baseUrl}/teachers/email=` + email, {
      headers: new HttpHeaders().set('Authorization', this.token)
     
    })
  }

  private loginRequest (data: any): Observable<any> {
    return this.http.post(`${baseUrl}/role`, data, {
      headers: new HttpHeaders().set('Authorization', this.token),
      responseType: 'text'
    })
  }

  public isAuthenticated (): boolean {
    const role = sessionStorage.getItem('role')
    return role == 'student' || role == 'profesor'
  }

  async authenticate (username, password) {
    console.log(this.token)
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
            sessionStorage.setItem('name', val.nume)
          })
        } else {
          this.getProfesorIdByEmail(username).subscribe(val => {
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
    sessionStorage.removeItem('name')
  }

  public getTokenRequest (data) {
    this.http
      .post<any>(`${loginUrl}/login`, data, { observe: 'response' })
      .subscribe(response => {
        if (response['authorization'] != null) {
          console.log(response['authorization'])
        }
        const keys = response.headers.keys()
        const headers = keys.map(key => `${key}: ${response.headers.get(key)}`)
        this.token = response.headers.get('authorization')
        sessionStorage.setItem('token', this.token)
      })
  }

  async getToken (username, password) {
    var jsonReq = { username: username, password: password }
    await this.getTokenRequest(jsonReq)
  }
}
