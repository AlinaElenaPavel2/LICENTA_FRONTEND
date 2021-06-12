
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentTableComponent } from './facultate/course/studentTable/student-table/student-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmailRecuperareComponent } from './facultate/course/email-recuperare/email-recuperare.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {FileUploadModule} from "ng2-file-upload";
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { DemoUtilsModule } from '../demo-utils/module';
// import { DemoComponent } from './component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { UploadFilesComponent } from './facultate/upload-files/upload-files.component';
import { UploadFileComponent } from './facultate/dashboard/upload-file/upload-file.component';
import { PrezenteTableComponent } from './facultate/dashboard/prezente-table/prezente-table.component';
import { QrScanComponent } from './facultate/qr-scan/qr-scan.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailsDialogComponent } from './facultate/calendar/details-dialog/details-dialog.component';
import { AddNewEventComponent } from './facultate/calendar/add-new-event/add-new-event.component';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 4000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
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
    ProfileComponent,
    StudentTableComponent,
    EmailRecuperareComponent,
    UploadFilesComponent,
    UploadFileComponent,
    PrezenteTableComponent,
    QrScanComponent,
    DetailsDialogComponent,
    AddNewEventComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    BrowserModule,   
    HttpClientModule,
    MatTabsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    NgApexchartsModule,
    NgbModule,
    NotifierModule.withConfig(customNotifierOptions),
    FlatpickrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'university/login',
        pathMatch: 'full'
      },
      {
        path: 'university',
        redirectTo: 'university/login',
        pathMatch: 'full'
      },
   
      { path: 'university/login', component: LoginComponent },
      { path: 'university/dashboard', component: DashboardComponent },
      { path: 'university/statistics', component: StatisticsComponent },
      { path: 'university/announces', component: AnnouncesComponent },
      { path: 'university/library', component: LibraryComponent },
      { path: 'university/calendar', component: CalendarComponent },
      { path: 'university/course/:name', component: CourseComponent },
      { path: 'university/profile', component: ProfileComponent },
      { path: 'university/course/:name/student/:student/laborator/:laborator/present/successfully', component: QrScanComponent }

    ]),

    ReactiveFormsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
