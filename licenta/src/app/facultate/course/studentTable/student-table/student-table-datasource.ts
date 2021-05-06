import { DataSource } from '@angular/cdk/collections'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'
import { PrezentaService } from 'src/app/facultate/Services/PrezentaService/prezenta.service'

export interface StudentTableItem {
  data: string
  laborator: number
  prezenta: string
}

export class StudentTableDataSource extends DataSource<StudentTableItem> {
  data: StudentTableItem[] = []
  paginator: MatPaginator | undefined
  sort: MatSort | undefined

  constructor (private prezenteService:PrezentaService,disciplinaName:string) {
    super()
    this.data=this.getStudentPrezente(disciplinaName);
  }

  getStudentPrezente (disciplinaName:string): StudentTableItem[] {
    var data
    var laborator
    var prezenta
    var aux

    var returnArray: StudentTableItem[] = []
    this.prezenteService
      .getPrezente(disciplinaName, sessionStorage.getItem('name'))
      .then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          data = resp[i].data.substring(0,10)
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
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect (): Observable<StudentTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]))
        })
      )
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      )
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect (): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData (data: StudentTableItem[]): StudentTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize
      return data.splice(startIndex, this.paginator.pageSize)
    } else {
      return data
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData (data: StudentTableItem[]): StudentTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc'
      switch (this.sort?.active) {
        case 'data':
          return compare(a.data, b.data, isAsc)
        case 'laborator':
          return compare(+a.laborator, +b.laborator, isAsc)
        case 'prezenta':
          return compare(+a.prezenta, +b.prezenta, isAsc)
        default:
          return 0
      }
    })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare (
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
