export class Comment{
    constructor(
        public idComment: number,
        public description: string,
        public commdate: Date, 
        public likescomment: number,
        public mostlikedcomment: boolean,
        public newstcomment: boolean 
      ) {}
}