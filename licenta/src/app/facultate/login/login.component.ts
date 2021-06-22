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

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private location: LocationStrategy
  ) {
    this.previousUrl = localStorage.getItem('previousUrl')
    if (this.previousUrl != undefined) {
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('ID')
      sessionStorage.removeItem('name')
      localStorage.removeItem('previousUrl')
    }
    history.pushState(null, null, window.location.href)
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href)
    })
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

    await this.loginservice.authenticate(
      this.getCredentials.email.value,
      this.getCredentials.password.value
    )

    setTimeout(() => {
      if (sessionStorage.getItem('role').valueOf() == 'wrongCredentials') {
        setTimeout(() => {
          this.router.navigate(['/university/login'])
        }, 300)
        this.invalidLogin = true
      } else {
        setTimeout(() => {
          this.router.navigate(['/university/announces'])
        }, 200)
        this.invalidLogin = false
      }
    }, 100)
  }

  get getCredentials () {
    return this.loginForm.controls
  }
}
