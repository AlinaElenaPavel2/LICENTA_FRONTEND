import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { FileUploadService } from 'src/app/facultate/Services/UploadFilesService/file-upload.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { FileStorageService } from '../Services/FileStorageService/file-storage.service'
import { FormControl, FormGroup } from '@angular/forms'

import { Profesor } from '../Models/profesor'
import { Disciplina } from '../Models/disciplina2'

const URL = 'http://localhost:8080/api/licenta/fileStorage/uploadMultipleFiles'

interface Link {
  link: string
  name: string
}
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  profesor: Profesor = new Profesor()
  name: string
  userRole: string
  books: string[] = []
  links: Link[]

  postLinks = new FormGroup({
    link: new FormControl(''),
    descriere: new FormControl(''),
    titlu: new FormControl(''),
  });

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

    var f = await this.fileStorage.getFilesForDisciplineComponent(
      discip[0].nume,
      'Auxiliare'
    )

    console.log(f)
    for (let i = 0; i < f.length; i++) {
      this.books.push(f[i])
    }

    localStorage.setItem('Materie', discip[0].nume)
    localStorage.setItem('Componenta', 'Auxiliare')
  }
  constructor (
    private fileUploadService: FileUploadService,
    private profesorService: ProfesorService,
    private programaScolaraService: ProgramaScolaraService,
    private fileStorage: FileStorageService
  ) {
    setTimeout(async () => {
      this.name = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      if (this.userRole == 'profesor') {
        this.getDataForProfesor()
      }
    }, 100)

    this.links = [
      {
        link: 'https://www.w3schools.com/howto/howto_css_cards.asp',
        name: 'Angular'
      },
      {
        link: 'https://www.w3schools.com/howto/howto_css_cards.asp',
        name: 'Typescript'
      },
      {
        link: 'https://www.w3schools.com/howto/howto_css_cards.asp',
        name: 'Javascript'
      },
      {
        link: 'https://www.w3schools.com/howto/howto_css_cards.asp',
        name: 'HTML'
      }
    ]
  }
  ngOnInit (): void {}

  getFileName (path) {
    var array = path.split('/')
    var fileName = array[8]
    return fileName
  }

  async onSubmit () {
    console.log('---------')
    console.log(this.postLinks.value.link)
    console.log(this.postLinks.value.titlu)
    console.log(this.postLinks.value.descriere)
  }
}
