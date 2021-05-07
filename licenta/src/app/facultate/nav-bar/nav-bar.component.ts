import { Component, Input, OnInit } from '@angular/core'
import { ProfilePictureService } from '../Services/ProfilePictureService/profile-picture.service'
import { StudentService } from '../Services/StudentService/student.service'
import { Student } from '../Models/student'

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  name = ''
  base64textString = []
  student: Student = new Student()

  async getProfilePicture()
  {
    var stud
    stud = await this.studentService.sendStudentDetails()

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
    var item=await this.profilePictureService.getProfilePicture(this.student.id_student)
    this.base64textString.push('data:image/png;base64,'+ item)
  }
  constructor (    private studentService: StudentService,
    private profilePictureService: ProfilePictureService) {
    setTimeout(() => {
      this.name = sessionStorage.getItem('name')
      this.getProfilePicture()
      console.log('navbar component')
      console.log(this.base64textString)
    }, 100)

  }

  ngOnInit (): void {}
}
