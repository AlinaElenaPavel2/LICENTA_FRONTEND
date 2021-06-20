import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/licenta/evenimente'

@Injectable({
  providedIn: 'root'
})
export class EvenimentService {
  constructor (private http: HttpClient) {}
  data

  public getExameneRequest (student: String): Observable<any> {
    return this.http.get<any>(`${baseUrl}/student=` + student)
  }

  public getExamenDisciplinaRequest (disciplina: String): Observable<any> {
    return this.http.get<any>(`${baseUrl}/disciplina=` + disciplina + '/examen')
  }

  public getEvenimenteByDisciplineRequest (
    disciplina: String
  ): Observable<any> {
    return this.http.get<any>(`${baseUrl}/disciplina=` + disciplina)
  }

  private addEvenimentRequest (disciplina, eveniment): Observable<any> {
    return this.http.post(`${baseUrl}/disciplina=` + disciplina, eveniment, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public getEvenimenteForStudentRequest (studentName: String): Observable<any> {
    return this.http.get<any>(`${baseUrl}/student=` + studentName + '/all')
  }

  private deleteEvenimentRequest (
    disciplina,
    titlu,
    startDate
  ): Observable<any> {
    return this.http.delete<any>(
      `${baseUrl}/disciplina=${disciplina}/titlu=${titlu}/startDate=${startDate}`
    )
  }

  private updateEvenimentRequest (id, eveniment): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, eveniment, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    })
  }

  async updateEveniment (id, eveniment) {
    console.log(eveniment)
    await this.updateEvenimentRequest(id, eveniment).subscribe({
      next: data => {
        console.log('PUT SUCCESSFULLY! - Updated event')
      },
      error: error => {
        console.log('PUT ERROR ' + error.message)
      }
    })
  }
  async deleteEveniment (disciplina, titlu, startDate) {
    await new Promise(resolve => {
      this.deleteEvenimentRequest(disciplina, titlu, startDate).subscribe(
        data => {
          this.data = data
          resolve(this.data)
        }
      )
    })
    return this.data
  }

  async addEveniment (disciplina, eveniment) {
    await this.addEvenimentRequest(disciplina, eveniment).subscribe({
      next: data => {
        console.log('POST SUCCESSFULLY! - Added event')
      },
      error: error => {
        console.log('POST ERROR ' + error.message)
      }
    })
  }

  public getExameneEveniment (student: String) {
    return new Promise(resolve => {
      this.getExameneRequest(student).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
  }
  async getExameneEvenimentStudent (student: String) {
    await this.getExameneEveniment(student)
    return this.data
  }

  async getEvenimenteForDiscipline (disciplina) {
    await new Promise(resolve => {
      this.getEvenimenteByDisciplineRequest(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  async getEvenimenteForStudent (studentName) {
    await new Promise(resolve => {
      this.getEvenimenteForStudentRequest(studentName).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }

  // async getEvenimenteByDisciplina(disciplina ) {
  //   await this.getEvenimenteByDisciplineRequest(disciplina)
  //     .subscribe({
  //       next: data => {
  //         console.log("POST SUCCESSFULLY! - Send email to all students")
  //       },
  //       error: error => {
  //         console.log("POST ERROR " + error.message);
  //       }
  //     });

  // }

  public async getExamenDisciplina (disciplina: String) {
    await new Promise(resolve => {
      this.getExamenDisciplinaRequest(disciplina).subscribe(data => {
        this.data = data
        resolve(this.data)
      })
    })
    return this.data
  }
}
