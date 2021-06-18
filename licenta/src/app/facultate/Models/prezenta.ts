export class Prezenta {
  id_disciplina: number
  id_student: number
  laborator: number
  data: string
  prezenta: string

  setComponents (
    id_disciplina: number,
    id_student: number,
    laboraor: number,
    data: string,
    prezenta: string
  ) {
    this.id_disciplina = id_disciplina
    this.id_student = id_student
    this.laborator = laboraor
    this.data = data
    this.prezenta = prezenta
  }
}
