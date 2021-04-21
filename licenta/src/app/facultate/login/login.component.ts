import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

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

  constructor (private router: Router, private formBuilder: FormBuilder) {}

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
    console.log("*********Credentiale*********")
    console.log(this.f.email.value, this.f.password.value)
    this.router.navigate(['/university/announces']);
  }

  get f () {
    return this.loginForm.controls
  }
}
