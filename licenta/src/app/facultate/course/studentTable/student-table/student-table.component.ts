import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable } from '@angular/material/table'
import {
  StudentTableDataSource,
  StudentTableItem
} from './student-table-datasource'
import { PrezentaService } from 'src/app/facultate/Services/PrezentaService/prezenta.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatTable, { static: false }) table: MatTable<StudentTableItem>
  @Input('childToMaster') masterName: string

  dataSource: StudentTableDataSource
  result: string = ''
  data: StudentTableItem[] = []
  displayedColumns = ['laborator', 'data', 'prezenta']

  refresh: Subject<any> = new Subject()

  constructor (private prezenteService: PrezentaService) {
    // this.dataSource = new StudentTableDataSource(this.prezenteService);
    // this.table.renderRows();
  }

  ngOnInit () {
    // var prezente=this.getStudentPrezente(this.masterName)
    // console.log("BUNAAAAAAAA")
    // console.log(prezente)
    this.dataSource = new StudentTableDataSource(
      this.prezenteService,
      this.masterName
    )

    console.log(this.dataSource.data)
    console.log(this.table)

    // console.log('BUNAAAAAAAA')
    // console.log(this.table)

    // this.table.dataSource = this.dataSource.data
    // this.table.renderRows()
    // console.log(this.dataSource)
  }
  getStudentPrezente (disciplinaName: string): StudentTableItem[] {
    var data
    var laborator
    var prezenta
    var aux

    var returnArray: StudentTableItem[] = []
    this.prezenteService
      .getPrezente(disciplinaName, sessionStorage.getItem('name'))
      .then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          data = resp[i].data.substring(0, 10)
          laborator = resp[i].laborator
          prezenta = resp[i].prezenta
          aux = { data: data, laborator: laborator, prezenta: prezenta }
          returnArray.push(aux)
        }
      })
    console.log(returnArray)
    this.data = returnArray

    return returnArray
  }
  update () {
    this.ngOnInit()
  }

  ngAfterViewInit (): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.table.dataSource = this.dataSource
    console.log(this.table)
    this.table.renderRows()
    this.refresh.next()
  }

  applyFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.prezenta.toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }

  applyLabFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.laborator
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }
  applyDataFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.data
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }
}
