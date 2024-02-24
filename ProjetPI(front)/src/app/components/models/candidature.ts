export interface Candidature {
    idCandidature: number;

    Name: string;
    Surname : string  ;
    Level : string;
    CV: File;

    dateSoumission: Date;

    statut: string;

    commentaires : string;


}