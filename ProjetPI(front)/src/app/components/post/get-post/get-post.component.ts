import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { post } from 'src/app/Models/post';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { PostinteractionService  } from '../postinteraction.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketService } from '../web-socket.service';
import { NotificationService } from '../../notification/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrls: ['./get-post.component.css']
})
export class GetPostComponent implements OnInit {
  likedPosts: Set<number> = new Set();
  bookmarkedPosts: Set<number> = new Set();

  private socket$: WebSocketSubject<any>;
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
  searchTerm: string='';



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
    private datePipe: DatePipe,
    private postInteractionService: PostinteractionService,
    private http :HttpClient ,
    private formBuilder: FormBuilder,
    private webSocketService: WebSocketService,
    private notificationService: NotificationService
  
    ) {
        // Initialize the comment form group for verify the badwords 
        this.commentForm = this.formBuilder.group({
          description: ['', [Validators.required]],
        });
      
      this.socket$ = webSocket('ws://localhost:8089/ProjetPI/ws');
  this.date = new Date();
  this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;

  this.socket$.subscribe(
    (event) => console.log('WebSocket Event:', event),
    (error) => console.error('WebSocket Error:', error),
    () => console.log('WebSocket Connection Closed')
  );

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
    });
  
    this.commentForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  
    this.fetchPosts();
  }
  
  fetchPosts() {
    this.postService.retrieveAllPosts().subscribe(
      (data) => {
        this.posts = data;
  
        // Assuming you want to use the first post's ID
        if (this.posts.length > 0) {
          this.idPost = this.posts[0].idPost;
          this.fetchComments(); // Fetch comments after setting idPost
        }
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  
  fetchComments() {
    if (this.idPost) {
      this.postService.retrieveAllcommentsAffectToidPost(this.idPost).subscribe(
        (data) => {
          // Assuming data is an array of comments
          this.comments = Array.isArray(data) ? data : [data];
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    } else {
      console.error('idPost is not set. Please set the idPost before calling fetchComments.');
    }
    this.postLike = { nbrlike: 0 }; // Update with the actual structure of your PostLike object
    this.postSave = { nbrsave: 0 }; // Update with the actual structure of your PostSave object
    this.loadLikedPosts();
    this.loadBookmarkedPosts();
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
/* 
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
  } */
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
  retrieveAllcommentsAffectToidPost() {
    const idPost = 2;
    this.postService.retrieveAllcommentsAffectToidPost(idPost).subscribe(
      (data: Comment[] | Comment) => {
        if (Array.isArray(data)) {
          this.comments = data;
        } else {
          this.comments = [data];
        }
        this.retrieveAllPosts();
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
    this.postService.addCommentToPostAndUser(this.commentForm.value, idPost, idUser)
      .subscribe(
        (addedComment: Comment) => {
          // Successfully added comment
          console.log('Comment added:', addedComment);
  
          // Notify via WebSocket
          const notification = {
            postId: idPost,
            describ: addedComment.description,
            userId: idUser
          };
          this.webSocketService.sendNotification(`${notification.postId} ${notification.describ} ${notification.userId}`);
  
          // Add the new comment to the existing comments array
          this.comments.push(addedComment);
  
          // Clear the comment form
          this.commentForm.reset();
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
        },
        () => {
          // Complete logic for the subscription
  
          // Perform any additional actions after adding the comment
          location.reload(); // You may want to update your comments list or do other actions here
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
 addLikeToPostAndUser(post: number): void {
  let index: number;
  if (this.idUser) {
    this.postInteractionService.addLikeToPostAndUser(post, this.idUser)
      .subscribe(
        response => {
          console.log('Like added successfully', response);

          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].idPost == post) {
              this.posts[i] = response
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
addSaveToPostAndUser(post: number): void {
  let index: number;
  if (this.idUser) {
    this.postInteractionService.addSaveToPostAndUser(post, this.idUser)
      .subscribe(
        response => {
          console.log('Save added successfully', response);
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].idPost == post) {
              this.posts[i] = response
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
  searchSynonyms() {
    this.postService.retrieveAllPosts().subscribe((res) => {
      this.posts = res.filter(
        (post: any) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
  toggleLike(post: any): void {
    const postId = post.idPost;
    if (this.likedPosts.has(postId)) {
      this.likedPosts.delete(postId);
    } else {
      this.likedPosts.add(postId);
    }

    // Call your existing method to add like to post and user
    this.addLikeToPostAndUser(postId);
    this.saveLikedPosts();
  }

  isLiked(post: any): boolean {
    return this.likedPosts.has(post.idPost);
  }
  toggleBookmark(post: any): void {
    const postId = post.idPost;
    if (this.bookmarkedPosts.has(postId)) {
      this.bookmarkedPosts.delete(postId);
    } else {
      this.bookmarkedPosts.add(postId);
    }

    // Call your existing method to add save to post and user
    this.addSaveToPostAndUser(postId);
    this.saveBookmarkedPosts();

  }

  isBookmarked(post: any): boolean {
    return this.bookmarkedPosts.has(post.idPost);
  }
  private loadLikedPosts(): void {
    const likedPostsString = localStorage.getItem('likedPosts');
    if (likedPostsString) {
      this.likedPosts = new Set(JSON.parse(likedPostsString));
    }
  }


  private loadBookmarkedPosts(): void {
    const bookmarkedPostsString = localStorage.getItem('bookmarkedPosts');
    if (bookmarkedPostsString) {
      this.bookmarkedPosts = new Set(JSON.parse(bookmarkedPostsString));
    }
  }
  private saveLikedPosts(): void {
    localStorage.setItem('likedPosts', JSON.stringify(Array.from(this.likedPosts)));
  }
  private saveBookmarkedPosts(): void {
    localStorage.setItem('bookmarkedPosts', JSON.stringify(Array.from(this.bookmarkedPosts)));
  }
  
}



