import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { StudentService } from '../Services/StudentService/student.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { PrezentaService } from '../Services/PrezentaService/prezenta.service'
import { EmailService } from '../Services/EmailService/email.service'
import { AnuntService } from '../Services/AnuntService/anunt-service.service'
import { LaboratorService } from '../Services/LaboratorService/laborator.service'
import { EvaluareService } from '../Services/EvaluareService/evaluare.service'

import { FileStorageService } from '../Services/FileStorageService/file-storage.service'
import { NotifierService } from 'angular-notifier'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { Student } from '../Models/student'
import { Disciplina } from '../Models/disciplina2'
import { Profesor } from '../Models/profesor'
import { Prezenta } from '../Models/prezenta'
import { Evaluare } from '../Models/evaluare'
import { Catalog } from '../Models/catalog'
import * as XLSX from 'xlsx'
import { Subject } from 'rxjs'

import * as moment from 'moment'

import {
  UploadFileDocumentModel,
  UploadFileComponent
} from 'src/app/facultate/dashboard/upload-file/upload-file.component'
import { MatDialog } from '@angular/material/dialog'
import { NotareComponent } from './notare/notare.component'

interface Notare {
  student: string
  grupa: string
  examen: number
  laborator: number
  partial: number
  proiect: number
}
interface LooseObject {
  [key: string]: any
}
interface Pondere {
  tip: string
  pondere: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('table') table: ElementRef

  student: Student = new Student()
  discipline: Disciplina[] = []
  profesor: Profesor = new Profesor()
  years: number[] = []
  anunturi = []
  name: string
  semestru: number = 0
  an: number = 0
  userRole: string
  selectedDiscippline: Disciplina[] = []
  studenti: Student[] = []
  prezente: Prezenta[] = []
  nbOfPrezente = [] as any
  fileLab: string[] = []
  fileCurs: string[] = []
  grupe: string[] = []
  laboratoare: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  email: FormGroup
  private notifier: NotifierService
  anunt: string = ''
  titlu: string = ''
  grupa
  loadingData = false
  procents: Evaluare = new Evaluare()
  displayedColumns = ['Student', 'Grupa']
  loadingDataNotare = false
  notareTable: Notare[] = []
  notaFinala: number[] = []
  edit: boolean = false
  ponderi: Pondere[] = []
  refresh: Subject<any> = new Subject()
  async getAnunturi (disciplina, grupa) {
    var anunturi = await this.anunturiService.getAnunturi(disciplina, grupa)
    return anunturi
  }
  async getDataForStudent (name) {
    var discip
    var stud
    stud = await this.studentService.sendStudentDetails(name)

    this.student.add(
      stud.id_student,
      stud.nume,
      stud.email,
      stud.telefon,
      stud.an,
      stud.specializare,
      stud.grupa,
      stud.program_studiu
    )

    for (var i = 0; i < stud.an; i++) {
      this.years.push(i + 1)
    }
    this.years.reverse()
    this.an = this.years.length
    // console.log('getYear')
    // console.log(this.years)

    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.student.an,
      2
    )
    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }
    this.loadingData = true
  }

  async getDataForProfesor () {
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
    this.getProcents(discip[0].nume)
    this.grupe = await this.laboratorService.getGrupe(discip[0].nume, prof.nume)
    console.log('GRUPE')
    console.log(this.grupe)

    var files = await this.fileStorage.getFilesForDisciplineComponent(
      discip[0].nume,
      'Laborator'
    )
    for (let i = 0; i < this.grupe.length; i++) {
      var anunturi = await this.getAnunturi(discip[0].nume, this.grupe[i])
      if (anunturi != null) {
        for (let j = 0; j < anunturi.length; j++) {
          this.anunturi.push(anunturi[j])
        }
      }
    }

    // console.log( this.anunturi)
    // console.log(files)
    for (let i = 0; i < files.length; i++) {
      this.fileLab.push(files[i])
    }

    var f = await this.fileStorage.getFilesForDisciplineComponent(
      discip[0].nume,
      'Curs'
    )

    // console.log(f)
    for (let i = 0; i < f.length; i++) {
      this.fileCurs.push(f[i])
    }

    for (let i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }

    console.log(this.discipline[0])

    for (let i = 0; i < this.discipline.length; i++) {
      this.studenti = await this.studentService.getStudentiDetails(
        this.discipline[0].nume,
        this.profesor.nume
      )
    }
    this.getNotareTableContent(this.discipline[0].nume)
    console.log(this.studenti)

    for (let i = 0; i < this.studenti.length; i++) {
      // console.log(this.studenti[i])
      var nbOfPrezente = await this.studentService.getPrezente(
        this.discipline[0].nume,
        this.studenti[i].nume
      )
      this.nbOfPrezente.push(nbOfPrezente)
    }
    console.log(this.nbOfPrezente)
    this.loadingData = true
    localStorage.setItem('Prezente', this.nbOfPrezente.toString())

    // for (let i = 0; i < this.studenti.length; i++) {
    //   var nbOfPrezente = await this.prezentaService.getPrezente(
    //     this.discipline[0].nume,
    //     this.studenti[i].nume
    //   )
    //   console.log(nbOfPrezente)
    // }
  }

  getFileName (path) {
    var array = path.split('/')
    var fileName = array[8]
    return fileName
  }
  // async getStudentsDetails(discipline)
  // {
  //   var dis=discipline
  //   console.log(dis[0])
  //   // var studenti = await this.studentService.getStudentiDetails(
  //   //   this.discipline[0].titlu,this.profesor.nume
  //   // )

  //   // console.log(studenti)
  // }
  constructor (
    private studentService: StudentService,
    private programaScolaraService: ProgramaScolaraService,
    private profesorService: ProfesorService,
    public dialog: MatDialog,
    private prezentaService: PrezentaService,
    private emailService: EmailService,
    private fileStorage: FileStorageService,
    private anunturiService: AnuntService,
    private laboratorService: LaboratorService,
    private evaluareService: EvaluareService,
    notifier: NotifierService,
    private router: Router
  ) {
    this.notifier = notifier
    // setTimeout(async () => {
    //   this.name = sessionStorage.getItem('name')
    //   this.userRole = sessionStorage.getItem('role')

    //   if (this.userRole == 'student') {
    //     this.getDataForStudent(this.name)
    //   } else {
    //     this.getDataForProfesor()
    //   }
    // }, 100)

    // console.log(this.student)
  }

  ngOnInit (): void {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'student') {
        this.getDataForStudent(this.name)
      } else {
        this.getDataForProfesor()
      }
    }, 100)

    this.email = new FormGroup({
      grupa: new FormControl(this.grupe),
      laborator: new FormControl(this.laboratoare)
    })
  }

  async getProcents (disciplina) {
    var pond = await this.evaluareService.sendProcentsDetails(disciplina)

    if (pond.pondere_lab != null) {
      var string = 'Laborator - '
      var string2 = ' %'
      var procent = pond.pondere_lab
      var pondere = { tip: 'laborator', pondere: pond.pondere_lab }
      this.ponderi.push(pondere)
      this.displayedColumns.push(
        string.concat(procent.toString()).concat(string2)
      )
    }

    if (pond.pondere_partial != null) {
      var string = 'Partial - '
      var string2 = ' %'
      var procent = pond.pondere_partial
      var pondere = { tip: 'partial', pondere: pond.pondere_partial }
      this.ponderi.push(pondere)
      this.displayedColumns.push(
        string.concat(procent.toString()).concat(string2)
      )
    }
    if (pond.pondere_examen != null) {
      var string = 'Examen - '
      var string2 = ' %'
      var procent = pond.pondere_examen
      var pondere = { tip: 'examen', pondere: pond.pondere_examen }
      this.ponderi.push(pondere)
      this.displayedColumns.push(
        string.concat(procent.toString()).concat(string2)
      )
    }
    if (pond.pondere_proiect != null) {
      var string = 'Proiect - '
      var string2 = ' %'
      var procent = pond.pondere_proiect
      var pondere = { tip: 'proiect', pondere: pond.pondere_proiect }
      this.ponderi.push(pondere)
      this.displayedColumns.push(
        string.concat(procent.toString()).concat(string2)
      )
    }
    this.displayedColumns.push('Nota finala')
    this.displayedColumns.push('Actiuni')

    // console.log(this.displayedColumns)

    this.loadingDataNotare = true
  }

  async getNotareTableContent (disciplina) {
    for (let i = 0; i < this.studenti.length; i++) {
      var note = await this.evaluareService.getNote(
        disciplina,
        this.studenti[i].nume
      )
      // console.log(note)
      var notare = {
        student: this.studenti[i].nume,
        grupa: this.studenti[i].grupa,
        examen: this.transform(note.examen),
        laborator: this.transform(note.laborator),
        partial: this.transform(note.partial),
        proiect: this.transform(note.proiect)
      }

      this.notaFinala.push(
        Math.round(this.calculateFinalMark(note, this.ponderi))
      )
      this.notareTable.push(notare)
    }
    console.log('NOTARE TABLE CONTENT')
    console.log(this.notareTable)
    console.log(this.ponderi)
  }
  getProcentsByElement (procente, tip) {
    for (let i = 0; i < procente.length; i++) {
      if (procente[i].tip == tip) {
        return procente[i].pondere * 0.01
      }
    }
  }
  calculateFinalMark (note, procente) {
    var medieFinala = 0
    if (note.examen != null) {
      medieFinala += note.examen * this.getProcentsByElement(procente, 'examen')
    }
    if (note.laborator != null) {
      medieFinala +=
        note.laborator * this.getProcentsByElement(procente, 'laborator')
    }
    if (note.partial != null) {
      medieFinala +=
        note.partial * this.getProcentsByElement(procente, 'partial')
    }
    if (note.proiect != null) {
      medieFinala +=
        note.proiect * this.getProcentsByElement(procente, 'proiect')
    }

    return medieFinala
  }

  transform (value) {
    if (value == null) {
      return '-'
    } else {
      return value
    }
  }

  async getYearDiscipline (event) {
    var discip
    const tab = event.tab.textLabel
    // console.log(tab)
    this.an = parseInt(tab.split(' ')[1])
    this.discipline.length = 0
    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.an,
      2
    )

    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }
  }

  async getDisciplinesForSemester (event) {
    var discip
    this.discipline.length = 0
    const tab = event.tab.textLabel
    // console.log(tab)
    this.semestru = parseInt(tab.split(' ')[1])
    // console.log(this.semestru)
    // console.log('******************')
    // console.log(this.an)
    // console.log(this.semestru)
    // console.log(this.student.specializare)
    // console.log(this.student.program_studiu)

    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.an,
      this.semestru
    )

    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }
    // console.log('********discipline**********')
    // console.log(this.discipline)
  }

  getSelectedDiscipline () {}

  upload (event) {
    const tab = event.tab.textLabel
    // console.log(tab)
  }

  addLaborator () {
    const component = 'Laborator'
    const dialogData = new UploadFileDocumentModel(
      component,
      this.discipline[0].nume
    )

    // console.log(this.discipline[0].nume)

    localStorage.setItem('Materie', this.discipline[0].nume)
    localStorage.setItem('Componenta', component)

    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '1450px',
      height: '600px',
      data: dialogData
    })
  }

  addCurs () {
    const component = 'Curs'
    const dialogData = new UploadFileDocumentModel(
      component,
      this.discipline[0].nume
    )
    // console.log(component)
    // console.log(this.discipline[0].nume)

    localStorage.setItem('Materie', this.discipline[0].nume)
    localStorage.setItem('Componenta', component)

    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '1150px',
      height: '600px',
      data: dialogData
    })
  }

  sendEmail () {
    console.log('sending email to ')
    var given = moment('2021-03-15', 'YYYY-MM-DD')
    const currentdate = moment().format('YYYY-MM-DD')
    var week = Math.floor(
      Math.abs(moment.duration(given.diff(currentdate)).asWeeks())
    )
    console.log(week)
    var sendEmails = {
      materie: this.discipline[0].nume,
      grupa: this.email.value.grupa,
      laborator: week
    }

    // this.emailService.sendEmailtoStudents(
    //   this.discipline[0].nume,
    //   this.email.value.grupa,
    //   this.email.value.laborator
    // )
    console.log(sendEmails)
    this.notifier.notify(
      'success',
      'Email-urile pentru validarea prezentei au fost trimise cu succes!'
    )
  }

  reloadCurrentRoute () {
    let currentUrl = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl])
    })
  }
  async addAnunt () {
    console.log('HELLLOOOOOOO')
    console.log(this.titlu)
    console.log(this.anunt)
    console.log(this.grupa)
    console.log(this.discipline[0].nume)
    var anunt = {
      titlu: this.titlu,
      descriere: this.anunt
    }
    await this.anunturiService.addAnunt(
      this.discipline[0].nume,
      this.grupa,
      anunt
    )
    this.notifier.notify('success', 'Anuntul a fost postat cu succes!')
    this.reloadCurrentRoute()
  }
  applyFilter (filterValue, column) {
    console.log(filterValue)
    console.log(column.split(' ')[0])
  }

  editValue (event, i) {
    console.log(i + 1)
    this.edit = true
  }
  async editare (eventToEdit, i) {
    console.log('UPDATE NOTE')

    var updateNote: { [k: string]: any } = {}
    if (eventToEdit.examen != '-') {
      updateNote.examen = eventToEdit.examen
    }
    if (eventToEdit.laborator != '-') {
      updateNote.laborator = eventToEdit.laborator
    }
    if (eventToEdit.partial != '-') {
      updateNote.partial = eventToEdit.partial
    }
    if (eventToEdit.proiect != '-') {
      updateNote.proiect = eventToEdit.proiect
    }
    // console.log(eventToEdit)
    await this.evaluareService.updateNote(
      eventToEdit.student,
      this.discipline[0].nume,
      updateNote
    )
    this.notifier.notify('success', 'Nota s-a modificat cu succes!')

    setTimeout(async () => {
      this.reloadCurrentRoute()
      // this.refresh.next()
    }, 500)
  }

  exportToExcel () {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    )
    delete ws['G']
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Note')

    XLSX.writeFile(wb, 'Notare.xlsx')
  }
}
