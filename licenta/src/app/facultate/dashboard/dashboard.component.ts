import { Component, OnInit } from '@angular/core'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { StudentService } from '../Services/StudentService/student.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { PrezentaService } from '../Services/PrezentaService/prezenta.service'

import { Student } from '../Models/student'
import { Disciplina } from '../Models/disciplina2'
import { Profesor } from '../Models/profesor'
import { Prezenta } from '../Models/prezenta'

import {
  UploadFileDocumentModel,
  UploadFileComponent
} from 'src/app/facultate/dashboard/upload-file/upload-file.component'
import { MatDialog } from '@angular/material/dialog'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: Student = new Student()
  discipline: Disciplina[] = []
  profesor: Profesor = new Profesor()
  years: number[] = []
  name
  semestru: number = 0
  an: number = 0
  userRole: string
  selectedDiscippline: Disciplina[] = []
  studenti: Student[] = []
  prezente: Prezenta[] = []
  nbOfPrezente = [] as any
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
    console.log('getYear')
    console.log(this.years)

    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.student.an,
      2
    )
    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }
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

    for (let i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }

    console.log(this.discipline)

    for (let i = 0; i < this.discipline.length; i++) {
      this.studenti = await this.studentService.getStudentiDetails(
        this.discipline[0].nume,
        this.profesor.nume
      )
    }

    for (let i = 0; i < this.studenti.length; i++) {
      console.log(this.studenti[i])
      var nbOfPrezente = await this.studentService.getPrezente(
        this.discipline[0].nume,
        this.studenti[i].nume
      )
      this.nbOfPrezente.push(nbOfPrezente)
    }
    console.log(this.nbOfPrezente)

    for (let i = 0; i < this.studenti.length; i++) {
      var nbOfPrezente = await this.prezentaService.getPrezente(
        this.discipline[0].nume,
        this.studenti[i].nume
      )
      console.log(nbOfPrezente)
    }
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
    private prezentaService: PrezentaService
  ) {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'student') {
        this.getDataForStudent(this.name)
      } else {
        this.getDataForProfesor()
      }
    }, 100)

    console.log(this.student)
  }

  ngOnInit (): void {}

  getYearDiscipline (event) {
    const tab = event.tab.textLabel
    console.log(tab)
    this.an = parseInt(tab.split(' ')[1])
    this.discipline.length = 0
  }

  async getDisciplinesForSemester (event) {
    var discip
    this.discipline.length = 0
    const tab = event.tab.textLabel
    console.log(tab)
    this.semestru = parseInt(tab.split(' ')[1])
    console.log(this.semestru)
    console.log('******************')
    console.log(this.an)
    console.log(this.semestru)
    console.log(this.student.specializare)
    console.log(this.student.program_studiu)

    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.an,
      this.semestru
    )

    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])
    }
    console.log('********discipline**********')
    console.log(this.discipline)
  }

  getSelectedDiscipline () {}

  upload (event) {
    const tab = event.tab.textLabel
    console.log(tab)
  }

  addLaborator () {
    console.log('adaugare laborator')
    const component = 'laborator'
    const dialogData = new UploadFileDocumentModel(component)

    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '1050px',
      height: '400px',
      data: dialogData
    })
  }

  addCurs () {
    console.log('adaugare curs')
    const component = 'curs'
    const dialogData = new UploadFileDocumentModel(component)

    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '1050px',
      height: '400px',
      data: dialogData
    })
  }
}
