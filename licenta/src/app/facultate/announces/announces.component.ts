import { Component, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import * as moment from 'moment'

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.css']
})
export class AnnouncesComponent implements OnInit {
  public panelOpenState = false
  previousUrl: string
  constructor (private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.localStorage.setItem('previousUrl', this.router.url)
      }
    })
    // if (
    //   localStorage.getItem('name') != undefined &&
    //   localStorage.getItem('role') != undefined
    // ) {
    //   var logginTime = localStorage.getItem('loginTime')
    //   var cuurentTime = moment()
    //     .format('LT')
    //     .split(' ')[0]
    //   console.log(logginTime)
    //   console.log(cuurentTime)
    //   if (
    //     moment(cuurentTime, 'HH:mm').diff(
    //       moment(logginTime, 'HH:mm'),
    //       'minutes'
    //     ) < 5
    //   ) {
    //     sessionStorage.setItem('name', localStorage.getItem('name'))
    //     sessionStorage.setItem('role', localStorage.getItem('role'))
    //     sessionStorage.setItem('token', localStorage.getItem('token'))

    //     // this.router.navigate(['/university/announces'])
    //   } else {
    //     console.log('YESSSS')
    //   }
    // }
    this.backFromLogin()
  }

  backFromLogin () {
    this.previousUrl = localStorage.getItem('previousUrl')
    if (
      this.previousUrl == '/university/login' &&
      localStorage.getItem('back') == 'true'
    ) {
      this.router.navigate(['/university/login'])
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    }
  }

  ngOnInit (): void {}
}
