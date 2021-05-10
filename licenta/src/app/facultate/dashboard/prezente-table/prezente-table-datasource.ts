import { DataSource } from '@angular/cdk/collections'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'

// TODO: Replace this with your own data model type
export interface PrezenteTableItem {
  name: string
  grupa: string
  prezente: number
  absente: number
  recuperari: number
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PrezenteTableItem[] = [
  { name: 'Hydrogen', grupa: '1206', prezente: 3, absente: 1, recuperari: 1 },
  { name: 'Helium', grupa: '1206', prezente: 3, absente: 1, recuperari: 1 },
  { name: 'Lithium', grupa: '1206', prezente: 3, absente: 1, recuperari: 1 },
  { name: 'Beryllium', grupa: '1206', prezente: 3, absente: 1, recuperari: 1 },
  { name: 'Boron', grupa: '1206', prezente: 3, absente: 1, recuperari: 1 }
]

/**
 * Data source for the PrezenteTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PrezenteTableDataSource extends DataSource<PrezenteTableItem> {
  data: PrezenteTableItem[] = EXAMPLE_DATA
  paginator: MatPaginator | undefined
  sort: MatSort | undefined

  constructor () {
    super()
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect (): Observable<PrezenteTableItem[]> {
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
  private getPagedData (data: PrezenteTableItem[]): PrezenteTableItem[] {
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
  private getSortedData (data: PrezenteTableItem[]): PrezenteTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc'
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc)
        case 'grupa':
          return compare(+a.grupa, +b.grupa, isAsc)
        case 'prezente':
          return compare(+a.prezente, +b.prezente, isAsc)
        case 'absente':
          return compare(+a.absente, +b.absente, isAsc)
        case 'recuperari':
          return compare(+a.recuperari, +b.recuperari, isAsc)
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
