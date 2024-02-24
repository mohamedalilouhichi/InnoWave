import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { post } from 'src/app/Models/post';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';

@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrls: ['./get-post.component.css']
})
export class GetPostComponent  implements OnInit  {
  idUser!: number ;
  posts: post[] = [];

  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(); // Initialize as needed
  newComment: string = ''; // Variable to store new comment input
  idPost!: number ; // Replace with the actual post ID

  comment: Comment = {
    idComment: 0,
    description: '',
    commdate: new Date(),
    likescomment: 0,
    mostlikedcomment: false,
    newstcomment: false
  };
  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {}

  postForm!:FormGroup;
  listPosts:post[]=[];
  comments: Comment[] = []; // Assuming Comment is the model/interface for your comments

 

  ngOnInit(): void {
   
      
    this.postForm=new FormGroup ({
      title:new FormControl('',[Validators.required,Validators.minLength(10)]),
      description:new FormControl('',[Validators.required,Validators.minLength(10)]),
      nbrlike:new FormControl('',Validators.required),
      nbrsave:new FormControl('',Validators.required),
      file:new FormControl('',Validators.required),
      creationdate:new FormControl('',Validators.required),
      mostlikedpost:new FormControl('',Validators.required),
      newstpost:new FormControl('',Validators.required),
      saved:new FormControl('',Validators.required),

    })

    this.fetchPosts();
  // this.retrieveAllcommentsAffectToidPost();

   
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedPost.file = file; // Assign the selected file to your post object
    }
  }
  fetchPosts() {
    this.postService.retrieveAllPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  retrieveAllPosts() {
    this.postService.retrieveAllPosts().subscribe(
      data => {
        this.posts = data;
        console.log('Données de la base :', this.posts);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des posts :', error);
      }
    );
  }
  openUpdateModal(post: any) {
    // Assign the stage object to selectedStage
    this.selectedPost = { ...post }; // Create a copy of the selected post
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }
    
  retrievePostsByidUser() {
    // Assuming you have the idUser available, replace 'YOUR_USER_ID' with the actual user ID.
    const idUser = 1;
  
    this.postService.retrievePostsByidUser(idUser).subscribe(
      (data: post[] | post) => {
        if (Array.isArray(data)) {
          this.posts = data;
        } else {
          this.posts = [data];
        }
        console.log('Données de la base :', this.posts);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }
  closeUpdateModal() {
    // Clear the selected object
    //this.selectedPost =  new post(0, '', '', 0, 0, '', new Date(), false, false, false)
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }
  /*retrieveAllcommentsAffectToidPost() {
    const idPost = 2; 
      this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe( 
          (data: Comment[] | Comment ) => {
            if(Array.isArray(data)){
              this.comments = data;
            } else {
            this.comments = [data];
          }
          console.log('Données de la base :', this.comments);
          },
          error => {
            console.error('Error retrieving comments:', error);
          }
        
      )
  }*/

  addPostToUser(idUser:number) {
  //  this.selectedPost.file="";
     // Assuming you have the idUser available, replace 'YOUR_USER_ID' with the actual user ID.

  // Combine the post data from the form with the user ID.
  const postData = {
    ...this.postForm.value,
    user: {
      idUser: idUser
    }
  };
    /*this.postService.addPostToUser(this.selectedPost,idUser).subscribe(()=>{
      console.log( "le post a été ajouté")
      this.closeUpdateModal();
       // 
       //console.log("notre form"+JSON.stringify(this.postForm.value))
       console.log(this.selectedPost);
      })
    }*/
    /*retrieveAllcommentsAffectToidPost() {
      const idPost = 2; 
        this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe( 
            (data: Comment[] | Comment ) => {
              if(Array.isArray(data)){
                this.comments = data;
              } else {
              this.comments = [data];
            }
            console.log('Données de la base :', this.comments);
            },
            error => {
              console.error('Error retrieving comments:', error);
            }
          
        )
    }*/
  /*  addComment(): void {
      this.postService.addCommentToPostAndUser(this.comment, this.idPost, this.idUser).subscribe(
        (addedComment: Comment) => {
          // Successfully added comment, you can handle it here
          console.log('Comment added:', addedComment);
        },
        (error) => {
          // Handle errors here
          console.error('Error adding comment:', error);
        }
      );*/
  }





 

  

 
  
   

}

