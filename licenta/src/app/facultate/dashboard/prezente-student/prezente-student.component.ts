import { Component, OnInit, Inject } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import { PrezentaService } from 'src/app/facultate/Services/PrezentaService/prezenta.service'
import { Prezenta } from 'src/app/facultate/Models/prezenta'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-prezente-student',
  templateUrl: './prezente-student.component.html',
  styleUrls: ['./prezente-student.component.css']
})
export class PrezenteStudentComponent implements OnInit {
  studentName: string
  grupa: string
  disciplina
  prezente: Prezenta[] = []
  loadingData: boolean = false
  displayedColumns: string[] = ['laborator', 'data','prezenta']
  dataSource: MatTableDataSource<Prezenta>

  async getStudentPrezente (disciplina, student) {
    var array: Prezenta[] = []
    var prezente = await this.prezentaService.getPrezente(disciplina, student)
    for (let i = 0; i < prezente.length; i++) {
      array.push(prezente[i])
    }
 
    return array
  }
  constructor (
    public dialog: MatDialogRef<PrezenteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrezenteStudentDialogModel,
    private prezentaService: PrezentaService
  ) {
    this.studentName = data.student
    this.grupa = data.grupa
    this.disciplina = data.disciplina[0].nume
  }

  async ngOnInit (): Promise<void> {
    var prezente = await this.prezentaService.getPrezente(
      this.disciplina,
      this.studentName
    )
    for (let i = 0; i < prezente.length; i++) {
      this.prezente.push(prezente[i])
    }

    this.dataSource = new MatTableDataSource<Prezenta>(this.prezente)
    if (this.prezente.length > 0) {
      this.loadingData = true
    }
    
  }

  onClick (): void {
    this.dialog.close()
  }

  getFormatData(data)
  {
    return data.substring(0,9)
  }

  applyLabFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      console.log(val.laborator)
      return val.laborator
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    })
    this.dataSource.data = filterdata
    if (filterValue == '') {
      this.dataSource.data = this.prezente
    }
  }
  applyDataFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.data
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    })
    this.dataSource.data = filterdata
    if (filterValue == '') {
      this.dataSource.data = this.prezente
    }
  }

  applyPrezentaFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.prezenta
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    })
    this.dataSource.data = filterdata
    if (filterValue == '') {
      this.dataSource.data = this.prezente
    }
  }
}

export class PrezenteStudentDialogModel {
  constructor (public student, public grupa, public disciplina) {}
}
