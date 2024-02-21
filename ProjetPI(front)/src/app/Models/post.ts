export class post{
    constructor(
        public idPost: number,
        public title: string,
        public description: string,
        public nbrlike: number,
        public nbrsave: number,
        public file: string, 
        public creationdate: Date, 
        public mostlikedpost: boolean,
        public newstpost: boolean ,
        public saved:boolean 

      ) {}
}