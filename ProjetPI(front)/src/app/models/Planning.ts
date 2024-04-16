export class Planning {
  idPlanning!: number;
  title!: string;
  niveau!: string;
  description!: string;
  dateDebut!: Date;
  dateFin!: Date;
  
}export class FavorisPlan {
  idPlanning!: number;
  idUser!:number;
  idFavoris!:number;
  
}