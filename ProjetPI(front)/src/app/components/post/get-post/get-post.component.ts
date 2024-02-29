import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { post } from 'src/app/Models/post';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { PostinteractionService  } from '../postinteraction.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
 

@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrls: ['./get-post.component.css']
})
export class GetPostComponent implements OnInit {
  idUser!: number;
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(); // Initialize as needed
  newComment: string = ''; // Variable to store new comment input
  idPost!: number; // Replace with the actual post ID
  idComment!: number;
  formData = new FormData();
  selectedFile!: File;
  date: Date;
  localDate: string;
  newCommentForm!: FormGroup;
  postComments: Comment[] = []; // Array to store post comments
  Post: post = new post();
  commentForm!: FormGroup;
  post: any; // Assuming you have a post object passed as input
  postLike: any; // Assuming you have a PostLike object
  postSave: any; // Assuming you have a PostSave object



  comment: Comment = {
    idComment: 0,
    description: '',
    commdate: new Date(),
    likescomment: 0,
    mostlikedcomment: false,
    newstcomment: false
  };
  @ViewChild('addModal') addModal!: ElementRef;

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService, 
    private formBuilder: FormBuilder, 
    private datePipe: DatePipe,
    private postInteractionService: PostinteractionService,
    private http :HttpClient ,
    ) {
    this.date = new Date();
    this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;
    
  }

  postForm!: FormGroup;
  listPosts: post[] = [];
  comments: Comment[] = []; // Assuming Comment is the model/interface for your comments


  ngOnInit(): void {


    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      file: new FormControl('', Validators.required),
      creationdate: new FormControl('', Validators.required),
      mostlikedpost: new FormControl('', Validators.required),
      newstpost: new FormControl('', Validators.required),
      saved: new FormControl('', Validators.required),

    })
    this.commentForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });

    this.fetchPosts();
    this.retrievePostsByidUser();
    this.fetchComments();  }
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
  fetchComments() {
    this.postService.retrieveAllcommentsAffectToidPost(this.idPost).subscribe(
      (data) => {
        this.comment = data;
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
  retrieveAllcommentsAffectToidPost() {
    const idPost = 2;
    this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe(
      (data: Comment[] | Comment) => {
        if (Array.isArray(data)) {
          this.comments = data;
        } else {
          this.comments = [data];
        }
        this.retrievePostsByidUser();
        console.log('Données de la base :', this.comments);

      },
      error => {
        console.error('Error retrieving comments:', error);
      }

    )
  }
  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
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



