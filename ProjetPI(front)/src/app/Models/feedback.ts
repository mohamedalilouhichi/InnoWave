export interface Feedback {

    idFeedback: number;
    name: string;
    surname: string;
    email: string;
    acontent: string;
    dateSubmitted: Date;
    ratings : Rating[];
    localVariableRating : number;

    moyrating : number;

}



    export class Rating {
        idRating!: number;
        idFeedback!: number; // Reference to the Feedback interface
        idUser!: number; // Adding idUser property
        status!: string;
        moyrating!: number; // Corrected naming convention for mean (moy) rating
    
        
    }
    
