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
import { FileStorageService } from '../Services/FileStorageService/file-storage.service'
import { AnuntService } from '../Services/AnuntService/anunt-service.service'

import { MatDialog } from '@angular/material/dialog'
import {
  EmailRecuperareComponent,
  EmailRecuperareModel
} from './email-recuperare/email-recuperare.component'

interface Book {
  path: string
  descriere: string
}
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
  name:string
  anunturi = []
  note: String[] = ['', '', '', '']
  disciplinaName: string
  studentId: number

  fisiereCurs:Book[]=[]
  fisiereLaborator:Book[]=[]

  async getAnunturi (disciplina) {
    var anunturi = await this.anunturiService.getAnunturi(disciplina, '1307')
    return anunturi
  }

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
    private fileStorage: FileStorageService,
    private anunturiService: AnuntService,

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
    console.log(name)
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

    console.log(this.disciplina.nume)

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

     this.anunturi=await this.anunturiService.getAnunturi(this.disciplinaName,this.student.grupa)
    console.log(this.anunturi)
  }

  async getFisiere(disciplina)
  {

    var fisiereCurs = await this.fileStorage.getFilesForDisciplineComponent(
      disciplina,
      'Curs'
    )
   
    var descrieriCurs = await this.fileStorage.getDescriptionForComponent(
      disciplina,
      'Curs'
    )
  
    for (let i = 0; i < fisiereCurs.length; i++) {
      var book = { path: fisiereCurs[i], descriere: descrieriCurs[i] }
      this.fisiereCurs.push(book)
    }
    console.log('----------------------------')
    console.log(this.fisiereCurs)

    var fisiereLaborator = await this.fileStorage.getFilesForDisciplineComponent(
      disciplina,
      'Laborator'
    )


    var descrieriLab = await this.fileStorage.getDescriptionForComponent(
      disciplina,
      'Laborator'
    )
    for (let i = 0; i < fisiereLaborator.length; i++) {
      console.log(this.getFileName(fisiereLaborator[i]))
      var book = { path: fisiereLaborator[i], descriere: descrieriLab[i] }
      this.fisiereLaborator.push(book)
    }
    console.log('----------------------------')
    console.log(this.fisiereLaborator)
  }

  getFileName (path) {
    var array = path.split('/')
    var fileName = array[8]
    return fileName
  }
  sub;
  async ngOnInit (): Promise<void> {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params)
      this.disciplinaName = params.get('name')
      console.log(this.disciplinaName)
    })
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      await this.getData(this.name)
    }, 1000)
    await this.getFisiere(this.disciplinaName);
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
