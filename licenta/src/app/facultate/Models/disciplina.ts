export class Disciplina {
    id_disciplina: number
    id_titular: number
    nume: string
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
      this.nume = titlu
      this.credite = credite
      this.abreviere = abreviere
    }
  }
  