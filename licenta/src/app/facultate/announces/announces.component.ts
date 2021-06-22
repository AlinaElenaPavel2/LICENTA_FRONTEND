import { Component, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'

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
      sessionStorage.removeItem('ID')
      sessionStorage.removeItem('name')
    }
  }

  ngOnInit (): void {}
}
