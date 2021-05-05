import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { StudentService } from '../Services/StudentService/student.service'
import { Student } from '../Models/student'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { Disciplina } from '../Models/disciplina2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File
  path: string = 'assets/images/placeholder2.png'
  student: Student = new Student()
  disciplina: Disciplina[] = []
  base64textString = []
  semestru:number=2;

  async getData () {
    var discip
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

    discip = await this.programaScolaraService.sendDisciplineDetails(
      this.student.program_studiu,
      this.student.specializare,
      this.student.an,
      this.semestru
    )
    for (var i = 0; i < discip.length; i++) {
      this.disciplina.push(discip[i])
    }
  }

  constructor (
    private studentService: StudentService,
    private programaScolaraService: ProgramaScolaraService
  ) {
    this.getData()
    console.log(this.disciplina)
    console.log(this.student)
  }

  ngOnInit (): void {}

  onFileChanged (event) {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile.name)
    this.path = 'assets/images/' + this.selectedFile.name
    if (this.selectedFile) {
      const reader = new FileReader()

      reader.onload = this.handleReaderLoaded.bind(this)
      reader.readAsBinaryString(this.selectedFile)
    }
    // upload picture to server
    // this.http.post('my-backend.com/file-upload', uploadData, {
    //   reportProgress: true,
    //   observe: 'events'
    // })
    //   .subscribe(event => {
    //     console.log(event); // handle event here
    //   });
  }

  handleReaderLoaded (e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result))
  }
}
