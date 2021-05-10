import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PrezenteTableDataSource, PrezenteTableItem } from './prezente-table-datasource';
import { Student } from 'src/app/facultate/Models/student'

@Component({
  selector: 'app-prezente-table',
  templateUrl: './prezente-table.component.html',
  styleUrls: ['./prezente-table.component.css']
})
export class PrezenteTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PrezenteTableItem>;
  dataSource: PrezenteTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','grupa','prezente','absente','recuperari','Actions'];

  constructor() {
    this.dataSource = new PrezenteTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
   
  }

  ngOnInit() {
   
  }

  OpenDialog()
  {
    console.log("detalii Studenti")
  }
}
