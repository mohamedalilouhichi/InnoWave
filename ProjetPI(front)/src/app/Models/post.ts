export class post{
 
         idPost!: number;
         title!: string;
         description!: string;
         file!: File; 
         creationdate!: Date; 
         mostlikedpost!: boolean;
         newstpost!: boolean ;
         saved!:boolean ;
         postLikes!:PostLike[];
         postSaves!:PostSave[];
        comments! :Comment[] ;

}

export class PostLike {
        idLike!: number;
        dislike!: boolean;
        nbrlike!: number;
    //    user: user; // Assuming you have a User model
        post!: post; // Assuming you have a Post model
}
export class PostSave {
        idSave!: number;
        disSave!: boolean;
        nbrSave!: number;
    //    user: user; // Assuming you have a User model
        post!: post; // Assuming you have a Post model
}