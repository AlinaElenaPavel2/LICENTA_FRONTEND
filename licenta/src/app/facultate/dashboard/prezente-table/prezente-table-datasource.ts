import { DataSource } from '@angular/cdk/collections'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'
import { Student } from 'src/app/facultate/Models/student'
import { __core_private_testing_placeholder__ } from '@angular/core/testing'
import { Disciplina } from 'src/app/facultate/Models/disciplina2'
import { StudentService } from 'src/app/facultate/Services/StudentService/student.service'
import { PrezentaService } from 'src/app/facultate/Services/PrezentaService/prezenta.service'
import { PrezentaRez } from 'src/app/facultate/Models/PrezentaRez'


export interface PrezenteTableItem {
  name: string
  grupa: string
  prezente: number
  absente: number
  recuperari: number
}

export class PrezenteTableDataSource extends DataSource<PrezenteTableItem> {
  data: PrezenteTableItem[] = []
  paginator: MatPaginator | undefined
  sort: MatSort | undefined
  prezente = [] as any
  studenti: Student[] = []
  disciplina: Disciplina[] = []

  constructor (
    private prezentaService: PrezentaService,
    private studentService: StudentService,
    studenti: Student[],
    disciplina: Disciplina[],
    prezente: PrezentaRez[]
  ) {
    super()
    this.studenti = studenti
    this.disciplina.push(disciplina[0])
    console.log('___________________')
    // console.log(this.studenti)
    // console.log(this.disciplina[0])
    // console.log(prezente)
    this.data = this.transformData(this.studenti, prezente)
    console.log(this.data)
    this.getPrezente()
  
  }
  transformData (studenti: Student[], prezente: PrezentaRez[]) {
    var returnArray: PrezenteTableItem[] = []

    for (let i = 0; i < studenti.length; i++) {
      var row = {
        name: studenti[i].nume,
        grupa: studenti[i].grupa,
        prezente: prezente[i].prezent,
        absente: prezente[i].absent,
        recuperari: prezente[i].recuperat
      }
      returnArray.push(row)
    }
    this.data = returnArray

    return returnArray
  }

  async getPrezente () {
    for (let i = 0; i < this.studenti.length; i++) {
      var prezent = await this.prezentaService.getPrezente(
        this.disciplina[0].nume,
        this.studenti[i].nume
      )
      this.prezente.push(prezent)
    }
    this.prezente.flat(1)
  }

  connect (): Observable<PrezenteTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ]

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]))
      })
    )
    // if (this.paginator && this.sort) {
    //   // Combine everything that affects the rendered data into one update
    //   // stream for the data-table to consume.
    //   return merge(
    //     observableOf(this.data),
    //     this.paginator.page,
    //     this.sort.sortChange
    //   ).pipe(
    //     map(() => {
    //       return this.getPagedData(this.getSortedData([...this.data]))
    //     })
    //   )
    // } else {
    //   throw Error(
    //     'Please set the paginator and sort on the data source before connecting.'
    //   )
    // }
  }

  disconnect (): void {}

  private getPagedData (data: PrezenteTableItem[]): PrezenteTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize
      return data.splice(startIndex, this.paginator.pageSize)
    } else {
      return data
    }
  }

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

function compare (
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
