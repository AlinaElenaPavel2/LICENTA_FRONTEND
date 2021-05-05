export class Evaluare {
  id_disciplina: number
  pondere_lab: number
  pondere_examen: number
  pondere_partial: number
  pondere_proiect: number

  setComponents (
    id_disciplina: number,
    pondere_lab: number,
    pondere_examen: number,
    pondere_partial: number,
    pondere_proiect: number
  ) {
    this.id_disciplina = id_disciplina
    this.pondere_lab = pondere_lab
    this.pondere_examen = pondere_examen
    this.pondere_partial = pondere_partial
    this.pondere_proiect = pondere_proiect
  }

  setPondereLab (pondere_lab: number) {
    this.pondere_lab = pondere_lab
  }

  setPondereExamen (pondere_examen: number) {
    this.pondere_examen = pondere_examen
  }

  setPonderePartial (pondere_partial: number) {
    this.pondere_partial = pondere_partial
  }

  setPondereLaborator (pondere_proiect: number) {
    this.pondere_proiect = pondere_proiect
  }
}
