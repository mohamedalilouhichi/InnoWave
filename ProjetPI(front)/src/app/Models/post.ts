import { Image } from "./image";

export class post{
 
         idPost!: number;
         title!: string;
         description!: string;
         file!: File; 
         moyrating!: number;
         postLikes!:PostLike[];
         postSaves!:PostSave[];
        comments! :Comment[] ;
        ratings : Rating[];

        imageUrl?:string
        imageIdCloudinary?:string
        imageId?:number;
        images?: Image[];
        imageFiles?: File[]; // Property for holding image files

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
export class Rating {
        idRating!: number;
        idUser!: number;
        idPost!: number;
        status!: string;
        moyrating!: number;
        

}