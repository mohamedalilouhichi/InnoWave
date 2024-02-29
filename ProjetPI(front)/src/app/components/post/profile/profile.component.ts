import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';
import { PostinteractionService  } from '../postinteraction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Post: post = new post();
  idUser: number; // Assuming you have the userId available in the component
  postComments: Comment[] = []; // Array to store post comments
  newComment: string = ''; // Variable to store new comment input
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(); // Initialize as needed
  idPost!: number ; // Replace with the actual post ID
  idComment!: number;
  formData = new FormData();
  selectedFile!: File;
  date: Date;
  localDate: string;
  commentForm!: FormGroup;
  newCommentForm!: FormGroup;
  post: any; // Assuming you have a post object passed as input
  postLike: any; // Assuming you have a PostLike object
  postSave: any; // Assuming you have a PostSave object
  uploadProgress!: number;
  postToUpdate!:post;

  comment: Comment = {
    idComment: 0,
    description: '',
    commdate: new Date(),
    likescomment: 0,
    mostlikedcomment: false,
    newstcomment: false
  };
  @ViewChild('addModal') addModal!: ElementRef ;
  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService,
     private formBuilder: FormBuilder,
     private router: Router,
     private acr : ActivatedRoute,
      private datePipe: DatePipe , 
      private postInteractionService: PostinteractionService,
      private http :HttpClient ,
      
      ) {
    this.date = new Date();
    this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;
  }
  postForm!: FormGroup;
  postFormModify!: FormGroup;

  comments: Comment[] = [];
  listPosts: post[] = [];

  ngOnInit(): void {
    this.postForm = new FormGroup({

      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      file: new FormControl('', Validators.required),
      creationdate: new FormControl('', Validators.required),
    });

    this.postFormModify = new FormGroup({
      idPost: new FormControl(''),

      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      file: new FormControl(File, Validators.required),
    });

    this.commentForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });

    this.acr.params.subscribe((params)=>
    this.idUser=params['id']
    )
    this.retrievePostsByidUser(this.idUser);
    this.fetchComments();
    this.postLike = { nbrlike: 0 }; // Update with the actual structure of your PostLike object
    this.postSave = { nbrsave: 0 }; // Update with the actual structure of your PostSave object

  }


  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
  deletePost(idPost: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.removePost(idPost).subscribe(
        () => {
          console.log('Post deleted successfully.');
          location.reload();

          this.retrievePostsByidUser(this.idUser);
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    } else {
      console.log('Deletion canceled');
    }
  }

  removecomment(idComment: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.postService.removecomment(idComment).subscribe(
        () => {
          console.log('Comment deleted successfully.');
          location.reload();

          this.fetchComments();
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    } else {
      console.log('Deletion canceled');
    }
  }
  //modify section 
  getPostbyid(idPost:number){
    this.postService.getPostbyid(idPost).subscribe((data)=>{
      this.post=data 
      console.log("une poste:"+JSON.stringify(this.post))
    })
  }


  get titleAjouter(){return this.postForm.get('title')}
  get descriptionAjouter(){return this.postForm.get('description')}
  get fileAjouter(){return this.postForm.get('file')}
  get creationdateAjouter(){return this.postForm.get('creationdate')}

 
  get title() { return this.postFormModify.get('title'); }
  get description() { return this.postFormModify.get('description'); }
  get file() { return this.postFormModify.get('file'); }
  get creationdate() { return this.postFormModify.get('creationdate'); }
  
  modifiedPost : post  ;
  modifyPost(): void {
    
  console.log(this.postFormModify.value)
    // Find the post with the given idPost
    //this.postToUpdate = this.listPosts.find(post => post.idPost.toString() == idPost.toString());
  
   
    this.modifiedPost = this.postFormModify.value;
    //form.controls['your form control name'].value
    
  
    // Assign values to the modifiedPost object
   
  
    // Debugging log
    console.log('Modified Post:', this.modifiedPost);
  
 // Assuming you have a method modifyPost in your post service
    this.postService.modifyPost(this.modifiedPost).subscribe(() => {
   console.log("Post has been modified");
   this.closeUpdateModal();
   location.reload(); 
    });

  }
  
  

  //retrieveAllPosts() {
    //this.postService.retrieveAllPosts().subscribe(
      //data => {
        //this.posts = data;
        //console.log('Données de la base :', this.posts);
     // },
     // error => {
      //  console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
//
  //    }
    //);
 // }

  //fetchPosts() {
    //this.postService.retrieveAllPosts().subscribe(
      //(data) => {
       // this.posts = data;
     // },
     // (error) => {
     //   console.error('Error fetching posts:', error);
     // }
   // );
 // }
  fetchComments() {
    this.postService.retrieveAllcommentsAffectToidPost(this.idPost).subscribe(
      (data) => {
        this.comment = data;
      },
      (error) => {
        console.error('Error fetching comments posts:', error);
      }
    );
  }
  retrieveAllcommentsAffectToidPost() {
    const idPost = 2;
    this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe(
      (data: Comment[] | Comment) => {
        if (Array.isArray(data)) {
          this.comments = data;
        } else {
          this.comments = [data];
        }
        this.retrievePostsByidUser(this.idUser);
        console.log('Données de la base :', this.comments);

      },
      error => {
        console.error('Error retrieving comments:', error);
      }

    )
  }



  addPostToUser(idUser: number) {
    this.post= this.postForm.value; 
    this.formData.append('idUser', this.idUser?.toString());
    this.formData.append('title', this.titleAjouter?.value.toString());
    this.formData.append('description', this.descriptionAjouter?.value.toString());
    this.formData.append('file', this.selectedFile);
    this.formData.append('creationdate', this.localDate);

    this.postService.addPostToUser(this.formData).subscribe(() => {
      console.log("added successfuly")
      location.reload();
      // 
      console.log("notre form"+JSON.stringify(this.postForm.value))
      this.closeAddModal();


    })
  }

  openAddModal() {
    // Initialize a new post object with default values
    this.selectedPost = new post();

    // Show the add modal
    this.addModal.nativeElement.style.display = 'block';
}
closeAddModal() {
  // Clear the selected object
  //this.selectedPost =  new post(0, '', '', 0, 0, '', new Date(), false, false, false)
  // Hide the update modal
  this.addModal.nativeElement.style.display = 'none';
}


  closeUpdateModal() {
    // Clear the selected object
    //this.selectedPost =  new post(0, '', '', 0, 0, '', new Date(), false, false, false)
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }
  openUpdateModal(post: post) {
    console.log(post.title);
    /* this.listPosts.forEach((post) => {
      //console.log(number); // Affiche chaque nombre dans la console
      if (post.idPost==idpost){
        this.postToUpdate=post
      }
      console.log(this.postToUpdate+"rrrrrr")
  }); */
    // Assign the stage object to selectedStage
    //this.postToUpdate = ; // Create a copy of the selected post
    // Show the update modal
    this.postToUpdate = post
    this.postFormModify.patchValue({
      idPost:post.idPost,
      title: post.title, 
      description: post.description,
      file: post.file
    });
    console.log(this.postFormModify)
    this.updateModal.nativeElement.style.display = 'block';
  }
  
  retrievePostsByidUser(idUser:number) {
    this.postService.retrievePostsByidUser(idUser).subscribe(
      (data: any[]) => {
        this.posts = data;
        console.log(data);
        
        console.log('posts retreived by id successfully',this.posts);
      },
      error => {
        console.log('posts retreive by id error',error);
      }
      );
  }
  addCommentToPostAndUser(idPost: number, idUser: number) {
    const newComment: Comment = {
      idComment: 0,
      description: '',
      commdate: new Date(),
      likescomment: 0,
      mostlikedcomment: false,
      newstcomment: false
    };

    this.postService.addCommentToPostAndUser(this.commentForm.value, idPost, idUser).subscribe(
      (addedComment: Comment) => {
        // Successfully added comment, you can handle it here
        console.log('Comment added:', addedComment);
        location.reload();

        // You may want to update your comments list or do other actions here
      },
      (error) => {
        // Handle errors here
        console.error('Error adding comment:', error);
      }
    );
  }


  ClickedUpdate: boolean = false;
  chosenComment: number = 0;

  showCommentForm(commentId: number) {
    if (this.ClickedUpdate === false) {
      this.ClickedUpdate = true;
    } else if (this.ClickedUpdate === true) {
      this.ClickedUpdate = false
    }

    this.chosenComment = commentId;
    console.log(this.ClickedUpdate)
  }
  modifyComment(idPost: number, idComment: number): void {
    this.postService.modifycomment(1, idPost, idComment, this.commentForm.get('description')!.value).subscribe(
      (comment: Comment[]) => {
        // Successfully modified comment, you can handle it here
        console.log('Comment modified:', comment);
        location.reload();
      },
      (error) => {
        // Handle errors here
        console.error('Error modifying comment:', error);
      }
    );
  }


  // Function to add a like
  addLikeToPostAndUser(post:number): void {
    let index:number;
    if ( this.idUser) {
      this.postInteractionService.addLikeToPostAndUser(post, this.idUser)
        .subscribe(
          response => {
            console.log('Like added successfully', response);
          
            for (let i = 0; i < this.posts.length; i++) {
              if(this.posts[i].idPost==post)
              {
                this.posts[i]=response
              }
            }
            // You can perform additional actions if needed
          },
          error => {
            console.error('Error adding like', error);
          }
        );
    } else {
      console.error('postId and userId are required.');
    }
  }
   // Function to add a save
   addSaveToPostAndUser(post:number): void {
    let index:number;
    if ( this.idUser) {
      this.postInteractionService.addSaveToPostAndUser(post, this.idUser)
        .subscribe(
          response => {
            console.log('Save added successfully', response);
            for (let i = 0; i < this.posts.length; i++) {
              if(this.posts[i].idPost==post)
              {
                this.posts[i]=response
              }
            }
            // You can perform additional actions if needed

          },
          error => {
            console.error('Error adding save', error);
          }
        );
    } else {
      console.error('postId and userId are required.');
    }
  }
  telechargerDocument(id: number) {
    const url = 'http://localhost:8089/ProjetPI/post/telecharger-pdf/'+id;
    this.http.get(url, { observe: 'response', responseType: 'blob' })
      .subscribe((response: HttpResponse<Blob>) => {
        this.telechargerFichier(response.body);
      });
  }

  telechargerFichier(data: Blob | null) {
  if (data !== null) {
    const nomFichier = 'doc.pdf';
    saveAs(data, nomFichier);
  }
  
}
}