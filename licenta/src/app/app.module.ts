import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { IconsModule } from 'angular-bootstrap-md';

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

import { AppComponent } from './app.component'
import { LoginComponent } from './facultate/login/login.component'
import { DashboardComponent } from './facultate/dashboard/dashboard.component'

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'university/login', component: LoginComponent },
      { path: 'university/dashboard', component: DashboardComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
