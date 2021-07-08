import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable } from '@angular/material/table'
import {
  PrezenteTableDataSource,
  PrezenteTableItem
} from './prezente-table-datasource'
import { Student } from 'src/app/facultate/Models/student'
import { Disciplina } from 'src/app/facultate/Models/disciplina2'
import { StudentService } from 'src/app/facultate/Services/StudentService/student.service'
import { PrezentaService } from 'src/app/facultate/Services/PrezentaService/prezenta.service'
import { PrezentaRez } from 'src/app/facultate/Models/PrezentaRez'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'

import {
  NotareComponent,
  NotareDialogModel
} from 'src/app/facultate/dashboard/notare/notare.component'

import {
  PrezenteStudentComponent,
  PrezenteStudentDialogModel
} from 'src/app/facultate/dashboard/prezente-student/prezente-student.component'
@Component({
  selector: 'app-prezente-table',
  templateUrl: './prezente-table.component.html',
  styleUrls: ['./prezente-table.component.css']
})
export class PrezenteTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable) table!: MatTable<PrezenteTableItem>
  @Input('studenti') studenti: Student[] = []
  @Input('disciplina') disciplina: Disciplina[] = []
  @Input('prezente') prezente: PrezentaRez[] = []

  dataSource: PrezenteTableDataSource

  displayedColumns = [
    'name',
    'grupa',
    'prezente',
    'absente',
    'recuperari',
    'Actions'
  ]

  constructor (public dialog: MatDialog,private studentService: StudentService,private prezentaService: PrezentaService) {
  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.table.dataSource = this.dataSource
  }

  ngOnInit () {
    this.dataSource = new PrezenteTableDataSource(this.prezentaService,this.studentService,this.studenti,this.disciplina,this.prezente)
  }

  OpenDialog (row,disciplina) {
  
    const dialogData = new PrezenteStudentDialogModel(row.name,row.grupa,disciplina)
    const dialogRef = this.dialog.open(PrezenteStudentComponent, {
      width: '900px',
      height: '600px',
      data: dialogData
    })
  }

  OpenDialogNotare (row) {
   
    const dialogData = new NotareDialogModel(row.name,row.grupa)
    const dialogRef = this.dialog.open(NotareComponent, {
      width: '600px',
      height: '400px',
      data: dialogData
    })
  }
  applyNumeFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.name.toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }

  applyGrupaFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.grupa.toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }

  applyPrezenteFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.prezente.toString().toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }

  applyAbsenteFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.absente.toString().toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }

  applyRecuperariFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.recuperari.toString().toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }
}
