import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  name = '';

  
  constructor() {
    setTimeout(() => {
      this.name = sessionStorage.getItem('name');
    },
    100);
   }

  ngOnInit(): void {
  }

}
