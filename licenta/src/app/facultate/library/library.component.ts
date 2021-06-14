import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { FileUploadService } from 'src/app/facultate/Services/UploadFilesService/file-upload.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { FileStorageService } from '../Services/FileStorageService/file-storage.service'
import { FormControl, FormGroup } from '@angular/forms'
import { StudentService } from '../Services/StudentService/student.service'

import { Profesor } from '../Models/profesor'
import { Disciplina } from '../Models/disciplina2'
import { Student } from '../Models/student'
import { NotifierService } from 'angular-notifier'
import { Router, ActivatedRoute } from '@angular/router'

const URL = 'http://localhost:8080/api/licenta/fileStorage/uploadMultipleFiles'

interface Link {
  disciplina: string
  link: string
  titlu: string
  descriere: string
}

interface StudentBooks {
  disciplina: string
  book: string
  descriere: string
}

interface Book {
  titlu: string
  descriere: string
}
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  name: string
  userRole: string
  profesor: Profesor = new Profesor()
  student: Student = new Student()

  discipline: Disciplina[] = []

  studentBooks: StudentBooks[] = []

  books: Book[] = []
  links: Link[] = []

  postLinks = new FormGroup({
    link: new FormControl(''),
    descriere: new FormControl(''),
    titlu: new FormControl('')
  })
  private notifier: NotifierService
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
    console.log(discip)

    var fisiere = await this.fileStorage.getFilesForDisciplineComponent(
      discip[0].nume,
      'Auxiliare'
    )

    var linkuri = await this.fileStorage.getLinksForDisciplineComponent(
      discip[0].nume
    )

    var descrieri = await this.fileStorage.getDescriptionForComponent(
      discip[0].nume,
      'Auxiliare'
    )
    console.log('----------------------------')
    console.log(descrieri)

    for (let i = 0; i < fisiere.length; i++) {
      var book = { titlu: fisiere[i], descriere: descrieri[i] }
      this.books.push(book)
    }

    for (let i = 0; i < linkuri.length; i++) {
      this.links.push(linkuri[i])
    }
    console.log(this.links)

    localStorage.setItem('Materie', discip[0].nume)
    localStorage.setItem('Componenta', 'Auxiliare')
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
    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.student.an,
      2
    )
    console.log(discip)
    for (var i = 0; i < discip.length; i++) {
      this.discipline.push(discip[i])

      var fisiere = await this.fileStorage.getFilesForDisciplineComponent(
        discip[i].nume,
        'Auxiliare'
      )
      var disciplina = discip[i].nume
      if (fisiere.length > 0) {
        var descrieri = await this.fileStorage.getDescriptionForComponent(
          discip[i].nume,
          'Auxiliare'
        )
        console.log('----------------------------')
        console.log(descrieri)

        for (let j = 0; j < fisiere.length; j++) {
          var book = {
            disciplina: disciplina,
            book: fisiere[j],
            descriere: descrieri[j]
          }
          this.studentBooks.push(book)
        }
      }

      var linkuri = await this.fileStorage.getLinksForDisciplineComponent(
        discip[i].nume
      )
      if (linkuri.length > 0) {
        for (let l = 0; l < linkuri.length; l++) {
          var link = {
            disciplina: disciplina,
            link: linkuri[l].path,
            titlu: linkuri[l].titlu,
            descriere: linkuri[l].descriere
          }
          this.links.push(link)
        }
      }
    }

    console.log(this.links)
    console.log(this.studentBooks)
  }
  constructor (
    private profesorService: ProfesorService,
    private programaScolaraService: ProgramaScolaraService,
    private fileStorage: FileStorageService,
    private studentService: StudentService,
    notifier: NotifierService,
    private router: Router
  ) {
    this.notifier = notifier

    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'profesor') {
        this.getDataForProfesor()
      } else {
        this.getDataForStudent(this.name)
      }
    }, 1000)
  }
  ngOnInit (): void {}

  getFileName (path) {
    var array = path.split('/')
    var fileName = array[8]
    return fileName
  }

  async onSubmit () {
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

    console.log('---------')
    var postLink = {
      path: this.postLinks.value.link,
      titlu: this.postLinks.value.titlu,
      descriere: this.postLinks.value.descriere
    }
    console.log(JSON.stringify(postLink))
   
    await this.fileStorage.postareLink(postLink, discip[0].nume)
    this.reloadCurrentRoute()
  }

  applyFilter (filterValue: string) {
    if (filterValue != '') {
      var filterBooks = this.studentBooks.filter(function (book) {
        return book.disciplina.toLowerCase().includes(filterValue.toLowerCase())
      })
      this.studentBooks = filterBooks

      var filterLinks = this.links.filter(function (link) {
        return link.disciplina.toLowerCase().includes(filterValue.toLowerCase())
      })
      this.links = filterLinks
    } else {
      this.studentBooks = []
      this.links = []
      this.getDataForStudent(this.name)
    }
  }

  async getData (event) {
    setTimeout(async () => {
      console.log('helooooo')
    }, 200)

    this.getDataForProfesor()
  }

  public showNotification (type: string, message: string): void {
    console.log('message')
    this.notifier.notify(type, message)
  }

  reloadCurrentRoute () {
    let currentUrl = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl])
    })
  }
}
