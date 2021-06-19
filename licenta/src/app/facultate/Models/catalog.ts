export class Catalog {
    id_student: number
    id_disciplina: number
    examen: number
    laborator: number
    partial: number
    proiect: number
  
    setComponents (
        id_student: number,
        id_disciplina: number,
        examen: number,
        laborator: number,
        partial: number,
        proiect: number
    ) {
      this.id_disciplina = id_disciplina
      this.id_student = id_student
      this.examen = examen
      this.laborator = laborator
      this.partial = partial
      this.proiect = proiect
    }
  

  
  }
  