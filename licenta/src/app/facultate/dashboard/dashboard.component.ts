import { Component, OnInit } from '@angular/core'
import { ProgramaScolaraService } from '../Services/ProgramaScolaraService/programa-scolara.service'
import { StudentService } from '../Services/StudentService/student.service'
import { Student } from '../Models/student'
import { Disciplina } from '../Models/disciplina2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: Student = new Student()
  discipline: Disciplina[] = []

  years: number[] = []
  name;
  semestru: number = 0
  an: number = 0

  selectedDiscippline:Disciplina[]=[]

  async getData (name) {
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

  constructor (
    private studentService: StudentService,
    private programaScolaraService: ProgramaScolaraService
  ) {
    setTimeout(() => {
      this.name = sessionStorage.getItem('name')
      console.log(this.name)
      this.getData(this.name)
    }, 100)
    
    console.log(this.student)
    
  }

  ngOnInit (): void {}

  getYearDiscipline(event) {
    const tab = event.tab.textLabel;
    console.log(tab);
    this.an=parseInt(tab.split(" ")[1]);
    this.discipline.length=0;
  }

  async getDisciplinesForSemester(event) {
    var discip;
    this.discipline.length=0;
    const tab = event.tab.textLabel;
    console.log(tab);
    this.semestru=parseInt(tab.split(" ")[1]);
    console.log(this.semestru);
    console.log('******************')
    console.log(this.an);
    console.log(this.semestru);
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

  getSelectedDiscipline()
  {

  }
}
