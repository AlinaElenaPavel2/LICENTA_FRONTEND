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

import {
  AddNewEventComponent,
} from './add-new-event/add-new-event.component'

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

interface Eveniment {
  start: string
  end: string
  title: string
  color: string
  descriere: string
  resizable
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

  view: CalendarView = CalendarView.Month

  CalendarView = CalendarView

  viewDate: Date = new Date()
  dateTimeValue: Date = new Date()

  modalData: {
    titlu: string
    event: CalendarEvent
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event)
      }
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event)
        // this.handleEvent('Deleted', event)
      }
    }
  ]

  refresh: Subject<any> = new Subject()

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = false

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
    var evenimente = await this.evenimentService.getEvenimenteForDiscipline(
      discip[0].nume
    )
    for (let i = 0; i < evenimente.length; i++) {
      var ev = {
        start: new Date(evenimente[i].start_date),
        end: new Date(evenimente[i].end_date),
        title: evenimente[i].titlu,
        // descriere: evenimente[i].descriere,
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
    private modal: NgbModal,
    private profesorService: ProfesorService,
    private programaScolaraService: ProgramaScolaraService,
    private evenimentService: EvenimentService,
    public dialog: MatDialog
  ) {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'profesor') {
        this.geEvenimenteProfesor()
      } else {
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
    // this.handleEvent('Dropped or resized', event)
  }

  // handleEvent (action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action }
  //   this.modal.open(this.modalContent, { size: 'lg' })
  // }

  openDialog (event: CalendarEvent) {
    var index = this.events.indexOf(event)

    const dialogData = new DetailsDialogModel(event, this.descrieri[index])
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      height: '400px',
      data: dialogData
    })
  }
  openAddEventDialog()
  {
   
    const dialogRef = this.dialog.open(AddNewEventComponent, {
      width: '600px',
      height: '400px',
      data: ''
    })
  }
  addEvent (): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ]
  }

  deleteEvent (eventToDelete: CalendarEvent) {
    var index = this.events.indexOf(eventToDelete)

    this.events = this.events.filter(event => event !== eventToDelete)
    console.log(index)
    var ev = {
      start: eventToDelete.start,
      titlu: eventToDelete.title,
      descriere: this.descrieri[index]
    }
    console.log(ev)
    //apel api to delete having ev body
  }

  setView (view: CalendarView) {
    this.view = view
  }

  closeOpenMonthViewDay () {
    this.activeDayIsOpen = false
  }

  editEvent () {
    this.editEvents = true
  }

  editare (eventToEdit: CalendarEvent) {
    var index = this.events.indexOf(eventToEdit)

    console.log(index)
    var ev = {
      start_date: eventToEdit.start,
      end_date: eventToEdit.end,
      titlu: eventToEdit.title,
      descriere: this.descrieri[index]
    }
    console.log(ev)
    //apel api to delete having ev body
  }
  onKey (descriere, i) {
    this.descrieri[i] = descriere
  }
}
