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
  @ViewChild(MatTable) table: MatTable<StudentTableItem>
  @Input('childToMaster') masterName: string

  dataSource: StudentTableDataSource
  result: string = ''

  displayedColumns = ['laborator', 'data', 'prezenta']

  refresh: Subject<any> = new Subject()
  loadingData: boolean = false

  constructor (private prezenteService: PrezentaService) {
    // this.dataSource = new StudentTableDataSource(this.prezenteService);
    // this.table.renderRows();
  }

  ngOnInit () {
    this.dataSource = new StudentTableDataSource(
      this.prezenteService,
      this.masterName
    )
    this.loadingData=true
   

  }

  update () {
    this.ngOnInit()
  }

  ngAfterViewInit (): void {
    this.table.dataSource = this.dataSource
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    // this.table.renderRows()

  }

  applyFilter (filterValue: string) {
    var filterdata = this.dataSource.data.filter(function (val) {
      return val.prezenta.toLowerCase().includes(filterValue.toLowerCase())
    })
    this.table.dataSource = filterdata
  }
}
