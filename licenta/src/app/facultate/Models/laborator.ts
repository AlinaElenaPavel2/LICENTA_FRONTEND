export class Laborator {
  id_disciplina: number
  id_profesor: number
  grupa: string

  setComponents (id_disciplina: number, id_profesor: number, grupa: string) {
    this.id_disciplina = id_disciplina
    this.id_profesor = id_profesor
    this.grupa = grupa
  }
}
