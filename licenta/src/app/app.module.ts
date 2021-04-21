import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { IconsModule } from 'angular-bootstrap-md'

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

import { AppComponent } from './app.component'
import { LoginComponent } from './facultate/login/login.component'
import { DashboardComponent } from './facultate/dashboard/dashboard.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NavBarComponent } from './facultate/nav-bar/nav-bar.component'
import { StatisticsComponent } from './facultate/statistics/statistics.component'
import { AnnouncesComponent } from './facultate/announces/announces.component'
import { LibraryComponent } from './facultate/library/library.component'
import { CalendarComponent } from './facultate/calendar/calendar.component'
import { CourseComponent } from './facultate/course/course.component';
import { ProfileComponent } from './facultate/profile/profile.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { DemoUtilsModule } from '../demo-utils/module';
// import { DemoComponent } from './component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    StatisticsComponent,
    AnnouncesComponent,
    LibraryComponent,
    CalendarComponent,
    CourseComponent,
    ProfileComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    BrowserModule,   
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'university',
        pathMatch: 'full'
      },
      { path: 'university/login', component: LoginComponent },
      { path: 'university/dashboard', component: DashboardComponent },
      { path: 'university/statistics', component: StatisticsComponent },
      { path: 'university/announces', component: AnnouncesComponent },
      { path: 'university/library', component: LibraryComponent },
      { path: 'university/calendar', component: CalendarComponent },
      { path: 'university/course', component: CourseComponent },
      { path: 'university/profile', component: ProfileComponent }

    ]),
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
