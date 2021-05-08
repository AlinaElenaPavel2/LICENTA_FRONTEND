export class Disciplina {
  id_disciplina: number
  id_titular: number
  titular: string
  titlu: string
  credite: number
  abreviere: string

  //    constructor(
  //     id_disciplina:number,
  //     id_titular:number,
  //     titlu:string,
  //     credite:number,
  //     abreviere:string

  //    ){
  //        this.id_disciplina=id_disciplina;
  //        this.id_titular=id_titular;
  //        this.titlu=titlu;
  //        this.credite=credite;
  //        this.abreviere=abreviere;
  //    }

  setComponents (
    id_disciplina: number,
    id_titular: number,
    titlu: string,
    credite: number,
    abreviere: string
  ) {
    this.id_disciplina = id_disciplina
    this.id_titular = id_titular
    this.titlu = titlu
    this.credite = credite
    this.abreviere = abreviere
  }
  setComponents2 (
    id_disciplina: number,
    id_titular: number,
    titular: string,
    titlu: string,
    credite: number,
    abreviere: string
  ) {
    this.id_disciplina = id_disciplina
    this.id_titular = id_titular
    this.titlu = titlu
    this.credite = credite
    this.abreviere = abreviere
    this.titular = titular
  }

  setTitular (titular: string) {
    this.titular = titular
  }
}
