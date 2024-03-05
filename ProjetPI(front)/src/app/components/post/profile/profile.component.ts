import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';
import { PostinteractionService  } from '../postinteraction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('notificationModal') notificationModal!: ElementRef;
  @ViewChild('savedPostsModal') savedPostsModal!: ElementRef;

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

        // Initialize the comment form group for verify the badwords 
        this.commentForm = this.formBuilder.group({
          description: ['', [Validators.required]],
        });
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

  this.acr.params.subscribe((params) => {
    this.idUser = +params['id']; // Convert idUser to a number
    this.idPost = 2; // Replace this with the actual post ID or obtain it from the component

    // Call the method with the valid idPost
    this.retrieveAllcommentsAffectToidPost(this.idPost);
    this.retrievePostsByidUser(this.idUser);
  });

  this.fetchComments();
  this.postLike = { nbrlike: 0 }; // Update with the actual structure of your PostLike object
  this.postSave = { nbrsave: 0 }; // Update with the actual structure of your PostSave object
}

ngAfterViewInit(): void {
}

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
  deletePost(idPost: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.removePost(idPost).subscribe(
          () => {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            console.log('Post deleted successfully.');
            location.reload();
            this.retrievePostsByidUser(this.idUser);
          },
          (error) => {
            console.error('Error deleting post:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
        console.log('Deletion canceled');
      }
    });
  }

  removecomment(idComment: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.removecomment(idComment).subscribe(
          () => {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your comment has been deleted.",
              icon: "success"
            });
            console.log('Comment deleted successfully.');
            location.reload();
            this.fetchComments();
          },
          (error) => {
            console.error('Error deleting comment:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your comment deletion is canceled :)",
          icon: "error"
        });
        console.log('Deletion canceled');
      }
    });
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
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.postFormModify.value);
        this.modifiedPost = this.postFormModify.value;
        console.log('Modified Post:', this.modifiedPost);
    
        this.postService.modifyPost(this.modifiedPost).subscribe(() => {
          console.log("Post has been modified");
          this.closeUpdateModal();
          location.reload();
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  
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
  retrieveAllcommentsAffectToidPost(idPost: number) {
    this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe(
      (data: Comment[] | Comment) => {
        if (Array.isArray(data)) {
          this.comments = data;
        } else {
          this.comments = [data];
        }
        this.retrievePostsByidUser(this.idUser);
        console.log('Data from the server:', this.comments);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP error occurred. Status:', error.status);
          console.error('Error details:', error.error);
        } else {
          console.error('Error retrieving comments:', error);
        }
      }
    );
  }
  


  addPostToUser(idUser: number) {
    this.post = this.postForm.value;
    this.postService.addPostToUser(
      this.post,
      idUser,
      this.titleAjouter?.value.toString(),
      this.descriptionAjouter?.value.toString(),
      this.selectedFile,
      this.localDate
    ).subscribe(
      (addedPost: post) => {
        console.log('Post added:', addedPost);
        location.reload();
        // You may want to update your posts list or do other actions here
      },
      (error) => {
        console.error('Error adding post:', error);
  
        // Check for a specific error message and display a custom alert
        if (error && typeof error === 'string') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Post contains inappropriate content or a subject that should not be posted here. Please review your post before submitting.'
          });
        }
      }
    );
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
    this.postService.addCommentToPostAndUser(this.commentForm.value, idPost, idUser)
      .subscribe(
        (addedComment: Comment) => {
          // Successfully added comment, you can handle it here
          console.log('Comment added:', addedComment);
          location.reload();
          // You may want to update your comments list or do other actions here
        },
        (error) => {
          // Handle errors here
          console.error('Error adding comment:', error);
  
          // Check for a specific error message and display a custom alert
          if (error && typeof error === 'string') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Comment contains inappropriate content or a subject that should not be posted here. Please review your post before submitting.'
            });
          }
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
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        confirmButton: "btn btn-success" // Adding custom CSS class to the confirm button
      }
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
isNotificationModalOpen: boolean = false;

openNotificationModal() {
  // Check if the notificationModal is open
  if (this.isNotificationModalOpen) {
    // If open, close it
    this.closeNotificationModal();
  } else {
    // If not open, open it
    // Your existing logic to open the modal goes here
    // For example, you can keep the following lines as is:
    if (this.notificationModal) {
      this.notificationModal.nativeElement.style.display = 'block';
      console.log('Notification modal opened.');
      this.isNotificationModalOpen = true; // Set the state to open
    } else {
      console.error('Error: notificationModal is undefined.');
    }
  }
}

openSavedPostsModal() {
  // Check if savedPostsModal is defined before accessing its nativeElement
  if (this.savedPostsModal) {
    this.savedPostsModal.nativeElement.style.display = 'block';
    console.log('Saved Posts modal opened.');
  } else {
    console.error('Error: savedPostsModal is undefined.');
  }
}

closeNotificationModal() {
  // Your existing logic to close the modal goes here
  // For example, you can keep the following lines as is:
  if (this.notificationModal) {
    this.notificationModal.nativeElement.style.display = 'none';
    console.log('Notification modal closed.');
    this.isNotificationModalOpen = false; // Set the state to closed
  } else {
    console.error('Error: notificationModal is undefined.');
  }}

closeSavedPostsModal() {
  // Check if savedPostsModal is defined before accessing its nativeElement
  if (this.savedPostsModal) {
    this.savedPostsModal.nativeElement.style.display = 'none';
  } else {
    console.error('Error: savedPostsModal is undefined.');
  }
}



}