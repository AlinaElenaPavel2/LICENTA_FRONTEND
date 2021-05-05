import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.css']
})
export class AnnouncesComponent implements OnInit {
  public panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
