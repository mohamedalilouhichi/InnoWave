export interface Feedback {

    idFeedback: number;
    name: string;
    surname: string;
    email: string;
    acontent: string;
    dateSubmitted: Date;
    ratings?: Rating[];

}


export class Rating {
    idRating!:number;
    idUser!:number;
    idCandidature!:number;
    status!:string;
    moyrating!:number;
}

