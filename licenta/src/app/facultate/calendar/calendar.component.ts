import { Component, OnInit } from '@angular/core'
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core'
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  format
} from 'date-fns'
import { Subject } from 'rxjs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent
} from 'angular-calendar'

import { EvenimentService } from '../Services/EvenimentService/eveniment.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'

import { Profesor } from '../Models/profesor'
import { Disciplina } from '../Models/disciplina2'
import { Student } from '../Models/student'
import { NotifierService } from 'angular-notifier'

import {
  DetailsDialogComponent,
  DetailsDialogModel
} from './details-dialog/details-dialog.component'

import { AddNewEventComponent } from './add-new-event/add-new-event.component'
import * as moment from 'moment'

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>

  name: string
  userRole: string
  profesor: Profesor = new Profesor()
  student: Student = new Student()
  discipline: Disciplina[] = []
  editEvents: boolean = false
  descrieri: string[] = []
  indexi: number[] = []
  format1 = 'YYYY-MM-DD HH:mm:ss'

  view: CalendarView = CalendarView.Month
  private notifier: NotifierService

  CalendarView = CalendarView

  viewDate: Date = new Date()
  dateTimeValue: Date = new Date()

  modalData: {
    titlu: string
    event: CalendarEvent
  }

  refresh: Subject<any> = new Subject()

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = false

  loadingData: boolean = true

  async geEvenimenteProfesor () {
    var prof = await this.profesorService.sendProfesorDetails(
      parseInt(sessionStorage.getItem('ID'))
    )
    this.profesor.setComponents(
      prof.id_profesor,
      prof.nume,
      prof.email,
      prof.telefon,
      prof.functia
    )
    var discip = await this.programaScolaraService.getDisciplineTitular(
      this.profesor.nume
    )
    this.discipline.push(discip)
    var evenimente = await this.evenimentService.getEvenimenteForDiscipline(
      discip[0].nume
    )
    for (let i = 0; i < evenimente.length; i++) {
      var ev = {
        start: new Date(evenimente[i].start_date),
        end: new Date(evenimente[i].end_date),
        title: evenimente[i].titlu,
        color: colors.red,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
      this.events.push(ev)
      this.descrieri.push(evenimente[i].descriere)
      this.indexi.push(evenimente[i].id)
    }
    console.log(this.events)
    console.log(this.descrieri)
    // this.loadingData=true
    this.refresh.next()
  }
  async getEvenimenteForStudent () {
    console.log(this.name)
    var evenimente = await this.evenimentService.getEvenimenteForStudent(
      this.name
    )
    for (let i = 0; i < evenimente.length; i++) {
      var ev = {
        start: new Date(evenimente[i].start_date),
        end: new Date(evenimente[i].end_date),
        title: evenimente[i].titlu,
        color: colors.red,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
      this.events.push(ev)
      this.descrieri.push(evenimente[i].descriere)
    }
    console.log(this.events)
    console.log(this.descrieri)
    this.refresh.next()
  }
  constructor (
    private profesorService: ProfesorService,
    private programaScolaraService: ProgramaScolaraService,
    private evenimentService: EvenimentService,
    public dialog: MatDialog,
    notifier: NotifierService
  ) {
    this.refresh.next()
    this.notifier = notifier
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'profesor') {
        this.geEvenimenteProfesor()
      } else {
        this.getEvenimenteForStudent()
      }
    }, 300)
  }
  ngOnInit (): void {}

  dayClicked ({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false
      } else {
        this.activeDayIsOpen = true
      }
      this.viewDate = date
    }
  }

  formatDate (date) {
    return moment(date).format(this.format1)
  }

  formatDateInput (date) {
    return moment(date)
      .format('LLL')
      .slice(0, -2) // June 22, 2021 9:16 AM
  }

  eventTimesChanged ({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        }
      }
      return iEvent
    })
  }

  openDialog (event: CalendarEvent) {
    var index = this.events.indexOf(event)

    const dialogData = new DetailsDialogModel(event, this.descrieri[index])
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      height: '400px',
      data: dialogData
    })
  }
  openAddEventDialog () {
    const dialogRef = this.dialog.open(AddNewEventComponent, {
      width: '900px',
      height: '600px',
      data: ''
    })
  }

  async deleteEvent (eventToDelete: CalendarEvent) {
    var prof = await this.profesorService.sendProfesorDetails(
      parseInt(sessionStorage.getItem('ID'))
    )
    this.profesor.setComponents(
      prof.id_profesor,
      prof.nume,
      prof.email,
      prof.telefon,
      prof.functia
    )
    var discip = await this.programaScolaraService.getDisciplineTitular(
      this.profesor.nume
    )

    var index = this.events.indexOf(eventToDelete)
    const format1 = 'YYYY-MM-DD HH:mm:ss'

    this.events = this.events.filter(event => event !== eventToDelete)
    console.log(index)
    var ev = {
      start_date: eventToDelete.start,
      titlu: eventToDelete.title,
      descriere: this.descrieri[index]
    }

    // console.log(ev)
    // console.log(moment(eventToDelete.start).format(format1))
    // console.log(discip[0].nume)
    await this.evenimentService.deleteEveniment(
      discip[0].nume,
      eventToDelete.title,
      moment(eventToDelete.start).format(format1)
    )
    this.notifier.notify('success', 'Evenimentul a fost sters cu succes!')
  }

  setView (view: CalendarView) {
    this.view = view
  }

  closeOpenMonthViewDay () {
    this.activeDayIsOpen = false
  }

  editEvent () {
    this.editEvents = true
    window.scrollTo(0, 900)
  }

  async editare (eventToEdit: CalendarEvent) {
    const format1 = 'YYYY-MM-DD HH:mm:ss'

    var index = this.events.indexOf(eventToEdit)

    var start = moment(eventToEdit.start)
    var end = moment(eventToEdit.end)
    var days = moment.duration(end.diff(start)).asDays()
    if (days < 0) {
      this.notifier.notify(
        'warning',
        'Ati ales o zi pentru terminarea evenimentului mai inainte de ziua terminarii!'
      )
    }

    var ev = {
      start_date: moment(eventToEdit.start).format(format1),
      end_date: moment(eventToEdit.start).format(format1),
      titlu: eventToEdit.title,
      descriere: this.descrieri[index]
    }

    await this.evenimentService.updateEveniment(this.indexi[index], ev)
    this.notifier.notify(
      'success',
      'Modificarea evenimentului a fost realizata cu succes!'
    )
    this.refresh.next()
  }
  onKey (descriere, i) {
    this.descrieri[i] = descriere
  }
}
