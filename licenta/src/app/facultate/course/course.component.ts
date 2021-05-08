import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Disciplina } from '../Models/disciplina2'
import { Profesor } from '../Models/profesor'
import { Student } from '../Models/student'
import { Laborator } from '../Models/laborator'
import { Evaluare } from '../Models/evaluare'
import { Prezenta } from '../Models/prezenta'

import { DisciplinaService } from '../Services/DisciplinaService/disciplina.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { StudentService } from '../Services/StudentService/student.service'
import { LaboratorService } from '../Services/LaboratorService/laborator.service'
import { EvaluareService } from '../Services/EvaluareService/evaluare.service'
import { PrezentaService } from '../Services/PrezentaService/prezenta.service'

import { MatDialog } from '@angular/material/dialog'
import {
  EmailRecuperareComponent,
  EmailRecuperareModel
} from './email-recuperare/email-recuperare.component'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  disciplina: Disciplina = new Disciplina()
  profesorCurs: Profesor = new Profesor()
  profesorLab: Profesor = new Profesor()

  student: Student = new Student()
  laborator: Laborator = new Laborator()
  procents: Evaluare = new Evaluare()

  prezente: Prezenta[] = []
  name

  note: String[] = ['', '', '', '']
  disciplinaName: string
  studentId: number

  constructor (
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private disciplinaService: DisciplinaService,
    private profesorService: ProfesorService,
    private studentService: StudentService,
    private laboratorService: LaboratorService,
    private evaluareService: EvaluareService,
    public dialog: MatDialog,
    private prezentaService: PrezentaService,

  ) {
    this.studentId = parseInt(sessionStorage.getItem('ID'))
  }

  async getData (name) {
    var discip = await this.disciplinaService.sendDisciplinaDetails(
      this.disciplinaName
    )
    this.disciplina.setComponents(
      discip.id_disciplina,
      discip.id_titular,
      discip.titlu,
      discip.credite,
      discip.abreviere
    )

    console.log('*************')
    console.log(this.disciplina)

    var prof = await this.profesorService.sendProfesorDetails(
      this.disciplina.id_titular
    )

    this.profesorCurs.setComponents(
      prof.id_profesor,
      prof.nume,
      prof.email,
      prof.telefon,
      prof.functia
    )
    console.log('*************')
    console.log(this.profesorCurs)

    var stud = await this.studentService.sendStudentDetails(name)

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
    console.log('*************')
    console.log(this.student)

    console.log(this.disciplina.titlu)

    var lab = await this.laboratorService.setProfLaboratorDetails(
      this.disciplinaName,
      this.student.grupa
    )
    this.laborator.setComponents(lab.id_disciplina, lab.id_profesor, lab.grupa)

    console.log('*************')
    console.log(this.laborator)

    var profLab = await this.profesorService.sendProfesorDetails(
      this.laborator.id_profesor
    )

    this.profesorLab.setComponents(
      profLab.id_profesor,
      profLab.nume,
      profLab.email,
      profLab.telefon,
      profLab.functia
    )
    console.log('*************')
    console.log(this.profesorLab)

    var pond = await this.evaluareService.sendProcentsDetails(
      this.disciplinaName
    )

    this.procents.setComponents(
      pond.id_disciplina,
      pond.pondere_lab,
      pond.pondere_examen,
      pond.pondere_partial,
      pond.pondere_proiect
    )
    if (this.procents.pondere_lab == null) {
      this.procents.setPondereLab(0)
      this.note[1] = '-'
    }

    if (this.procents.pondere_partial == null) {
      this.procents.setPonderePartial(0)
      this.note[2] = '-'
    }

    if (this.procents.pondere_proiect == null) {
      this.procents.setPondereLaborator(0)
      this.note[3] = '-'
    }

    console.log('*************')
    console.log(this.procents)

    var prezent=await this.prezentaService.getPrezente(
      this.disciplinaName,this.student.nume
    )
    console.log('*************')
    console.log(prezent)
  }

  sub
  async ngOnInit (): Promise<void> {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params)
      this.disciplinaName = params.get('name')
      console.log(this.disciplinaName)
    })
    setTimeout(() => {
      this.name = sessionStorage.getItem('name')
    }, 1000)
    await this.getData(this.name)
  }

  ngOnDestroy () {
    this.sub.unsubscribe()
  }

  onBack (): void {
    this._router.navigate(['dashboard'])
  }

  recuperare () {
    console.log('programeaza recuperare')
    var email = 'alina_pavel98@yahoo.com'
    const dialogData = new EmailRecuperareModel(email)
    const dialogRef = this.dialog.open(EmailRecuperareComponent, {
      width: '600px',
      height: '400px',
      data: dialogData
    })
  }
}
