export class Profesor {
  id_profesor: number
  nume: string
  email: string
  telefon: string
  functia: number

  //    constructor(
  //     id_student:number,
  //     nume:string,
  //     email:string,
  //     telefon:string,
  //     an:number,
  //     specializare:string,
  //     grupa:string,
  //     programStudiu:string,

  //    ){
  //        this.id_student=id_student;
  //        this.nume=nume;
  //        this.email=email;
  //        this.telefon=telefon;
  //        this.an=an;
  //        this.specializare=specializare;
  //        this.grupa=grupa;
  //        this.program_studiu=programStudiu;
  //    }

  setComponents (
    id_profesor: number,
    nume: string,
    email: string,
    telefon: string,
    functia: number
  ) {
    this.id_profesor = id_profesor
    this.nume = nume
    this.email = email
    this.telefon = telefon
    this.functia = functia
  }
}
