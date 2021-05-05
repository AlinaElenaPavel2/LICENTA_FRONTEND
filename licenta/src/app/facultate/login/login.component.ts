import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from '../Services/LoginService/login.service'

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

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: LoginService
  ) {}

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%+-]+@student.tuiasi.ro$')
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async onSubmit () {
    this.submitted = true
    console.log('*********Credentiale*********')
    console.log(this.getCredentials.email.value, this.getCredentials.password.value)

    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.router.navigate(['/university/announces'])

    await this.loginservice.authenticate(this.getCredentials.email.value, this.getCredentials.password.value);

    
    setTimeout(() => {
      if (sessionStorage.getItem("role").valueOf() == 'wrongCredentials') {
        // this.router.navigate(['/university']);
        this.invalidLogin = true;
      }
      else {
        console.log("da")
        // this.router.navigate(['/university/dashboard']);
        this.invalidLogin = false;
      }
    },
      1000);

  }

  get getCredentials () {
    return this.loginForm.controls
  }
}
