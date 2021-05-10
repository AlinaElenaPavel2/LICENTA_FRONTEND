import { Component, OnInit } from '@angular/core'
import { StudentService } from '../Services/StudentService/student.service'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { ProfilePictureService } from '../Services/ProfilePictureService/profile-picture.service'
import { ProfesorService } from '../Services/ProfesorService/profesor.service'

import { Disciplina } from '../Models/disciplina2'
import { Student } from '../Models/student'
import { Profesor } from '../Models/profesor'

import * as fs from 'fs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File
  student: Student = new Student()
  profesor: Profesor = new Profesor()
  disciplina: Disciplina[] = []
  titulari: string[] = []

  base64textString = []
  semestru: number = 2
  userName: string = ''
  userRole: string = ''

  async getData (userName, userRole) {
    if (userRole == 'student') {
      var stud = await this.studentService.sendStudentDetails(userName)

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
      console.log(this.student)
      var discip = await this.programaScolaraService.sendDisciplineDetails(
        this.student.program_studiu,
        this.student.specializare,
        this.student.an,
        this.semestru
      )
      for (var i = 0; i < discip.length; i++) {
        this.disciplina.push(discip[i])
      }
    } else {
      // pentru profesor de completat profilul
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
      console.log(this.profesor)

      var discip = await this.programaScolaraService.getDisciplineTitular(
        this.profesor.nume
      )
      for (var i = 0; i < discip.length; i++) {
        this.disciplina.push(discip[i])
        // if (this.profesor.id_profesor === discip[i].id_titular) {
        //   console.log("helllloooo")
        //   this.disciplina[i].setComponents2(
        //     discip.id_disciplina,
        //     discip.id_titular,
        //     'Curs',
        //     discip.titlu,
        //     discip.credite,
        //     discip.abreviere
        //   )
        // }
      }

      console.log(this.disciplina)
    }
    var item
    if (this.userRole === 'student') {
      item = await this.profilePictureService.getProfilePicture(
        this.userRole,
        this.student.id_student
      )
    } else {
      item = await this.profilePictureService.getProfilePicture(
        this.userRole,
        this.profesor.id_profesor
      )
    }
    if (item) {
      this.base64textString.push('data:image/png;base64,' + item)
    } else {
      this.base64textString.push(this.readLocalImage())
    }
  }

  constructor (
    private studentService: StudentService,
    private profesorService: ProfesorService,
    private programaScolaraService: ProgramaScolaraService,
    private profilePictureService: ProfilePictureService
  ) {
    setTimeout(() => {
      this.userName = sessionStorage.getItem('name')
      this.userRole = sessionStorage.getItem('role')

      this.getData(this.userName, this.userRole)
    }, 1000)

  
  }

  ngOnInit (): void {
    
  }

  onFileChanged (event) {
    this.base64textString.length = 0
    this.selectedFile = event.target.files[0]
    if (this.selectedFile) {
      const reader = new FileReader()

      reader.onload = this.handleReaderLoaded.bind(this)
      reader.readAsBinaryString(this.selectedFile)
    }
  }

  handleReaderLoaded (e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result))
    if (this.userRole === 'student') {
      this.profilePictureService.storeProfilePhoto(
        this.userRole,
        this.student.id_student,
        this.base64textString[0]
      )
    } else {
      console.log(this.base64textString)
      this.profilePictureService.storeProfilePhoto(
        this.userRole,
        this.profesor.id_profesor,
        this.base64textString[0]
      )
    }
  }

  readLocalImage () {
    var base64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAxLTA5VDE2OjA3OjUyLTA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMS0wOVQxNjowODoyNi0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0wOVQxNjowODoyNi0wNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MGFkZjdmMC0zMTgz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'

    return base64
  }
}
