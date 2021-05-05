export class   Student{
    id_student:number;
    nume:string;
    email:string;
    telefon:string;
    an:number;
    specializare:string;
    grupa:string;
    program_studiu:string;

 
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

   add(
    id_student:number,
    nume:string,
    email:string,
    telefon:string,
    an:number,
    specializare:string,
    grupa:string,
    programStudiu:string,
       
   ){
       this.id_student=id_student;
       this.nume=nume;
       this.email=email;
       this.telefon=telefon;
       this.an=an;
       this.specializare=specializare;
       this.grupa=grupa;
       this.program_studiu=programStudiu;
   }
   
}