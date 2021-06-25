import { Component, OnInit, HostListener } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
  RoutesRecognized
} from '@angular/router'
import { LoginService } from '../Services/LoginService/login.service'
import { LocationStrategy } from '@angular/common'
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler'
import { NotifierService } from 'angular-notifier'
import * as moment from 'moment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  submitted = false
  invalidLogin = false
  hide = true
  previousUrl: string
  invalidCredentials: string = 'false'
  invalidCredentialsMessage: string
  remember: boolean = false
  private notifier: NotifierService

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private location: LocationStrategy,
    notifier: NotifierService
  ) {
    this.notifier = notifier
    // this.previousUrl = localStorage.getItem('previousUrl')
    // if (this.previousUrl != undefined) {
    //   sessionStorage.removeItem('role')
    //   sessionStorage.removeItem('name')
    //   localStorage.removeItem('previousUrl')
    // }
    if (
      localStorage.getItem('name') != undefined &&
      localStorage.getItem('role') != undefined
    ) {
      var logginTime = localStorage.getItem('loginTime')
      var cuurentTime = moment()
        .format('LT')
        .split(' ')[0]
      console.log(logginTime)
      console.log(cuurentTime)
      if (
        moment(cuurentTime, 'HH:mm').diff(
          moment(logginTime, 'HH:mm'),
          'minutes'
        ) < 5
      ) {
        sessionStorage.setItem('name', localStorage.getItem('name'))
        sessionStorage.setItem('role', localStorage.getItem('role'))
        sessionStorage.setItem('token', localStorage.getItem('token'))

        this.router.navigate(['/university/announces'])
      } else {
      console.log("YESSSS")
      }
    }
  }

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@+(student|profesor)+.tuiasi.ro$'
          )
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async onSubmit () {
    this.submitted = true
    console.log(this.getCredentials.email.value)
    console.log(this.getCredentials.password.value)

    var em = this.validateEmail(this.getCredentials.email.value)
    var pass = this.validatePassword(this.getCredentials.password.value)
    if (em == true && pass == true) {
      this.loginservice.getToken(
        this.getCredentials.email.value,
        this.getCredentials.password.value,
        this.remember
      )
      setTimeout(async () => {
        await this.loginservice.authenticate(
          this.getCredentials.email.value,
          this.getCredentials.password.value
        )
      }, 300)

      setTimeout(() => {
        if (sessionStorage.getItem('role').valueOf() == 'wrongCredentials') {
          setTimeout(() => {
            this.router.navigate(['/university/login'])
          }, 300)
          this.invalidLogin = true
        } else {
          setTimeout(() => {
            this.router.navigate(['/university/announces'])
          }, 300)
          this.invalidLogin = false
        }
      }, 600)
    } else {
      this.notifier.notify('error', 'Username or password are not valid!')
    }
  }

  get getCredentials () {
    return this.loginForm.controls
  }

  validateEmail (email) {
    var patt = new RegExp('^[A-Za-z0-9._%+-]+@+(student|profesor)+.tuiasi.ro')
    var res = patt.test(email)
    if (res == false) {
      this.invalidCredentials = 'true'
      return false
    } else {
      return true
    }
  }

  validatePassword (password) {
    if (password.length < 6) {
      this.invalidCredentials = 'true'
      return false
    } else {
      return true
    }
  }

  onChange (element) {
    this.remember = element
    console.log(this.remember)
  }
}
