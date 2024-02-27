import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Post: post = new post();
  idUser!: number; // Assuming you have the userId available in the component
  postComments: Comment[] = []; // Array to store post comments
  newComment: string = ''; // Variable to store new comment input
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(); // Initialize as needed
  idPost!: number; // Replace with the actual post ID
  idComment!: number;
  formData = new FormData();
  selectedFile!: File;
  date: Date;
  localDate: string;
  commentForm!: FormGroup;
  newCommentForm!: FormGroup;


  comment: Comment = {
    idComment: 0,
    description: '',
    commdate: new Date(),
    likescomment: 0,
    mostlikedcomment: false,
    newstcomment: false
  };

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.date = new Date();
    this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;
  }
  postForm!: FormGroup;

  comments: Comment[] = [];
  listPosts: post[] = [];

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      nbrlike: new FormControl('', Validators.required),
      nbrsave: new FormControl('', Validators.required),
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
    this.retrievePostsByidUser();
    this.fetchComments();


  }

  deletePost(idPost: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.removePost(idPost).subscribe(
        () => {
          console.log('Post deleted successfully.');
          location.reload();

          this.fetchPosts();
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

  modifyPost(idPost: string): void {
    // Assuming you have the selectedPost and selectedFile available
    this.formData.append('idPost', idPost);
    this.formData.append('title', this.postForm.get('title')?.value);
    this.formData.append('description', this.postForm.get('description')?.value);
    this.formData.append('nbrlike', '0');
    this.formData.append('file', this.selectedFile);
    this.formData.append('nbrsave', '0');
    this.formData.append('saved', 'false');
    this.formData.append('creationdate', this.localDate);
    this.formData.append('mostlikedpost', 'false');
    this.formData.append('newstpost', 'false');

    // Log form data for debugging
    this.formData.forEach((value, key) => {
      console.log(`Field name: ${key}`);
      console.log(`Field value: ${value}`);
    });

    const postData = {
      ...this.postForm.value,
      post: {
        idPost: idPost
      }
    };

    // Assuming you have a method modifyPost in your post service
    this.postService.modifyPost(this.formData).subscribe(() => {
      console.log("Post has been modified");
      location.reload();

      this.closeUpdateModal();
    });
  }


  retrieveAllPosts() {
    this.postService.retrieveAllPosts().subscribe(
      data => {
        this.posts = data;
        console.log('Données de la base :', this.posts);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);

      }
    );
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

  addPostToUser(idUser: string) {
    this.formData.append('idUser', idUser);
    this.formData.append('title', this.postForm.get('title')?.value);
    this.formData.append('description', this.postForm.get('description')?.value);
    this.formData.append('nbrlike', '0');
    this.formData.append('file', this.selectedFile);
    this.formData.append('nbrsave', '0');
    this.formData.append('saved', 'false');
    this.formData.append('creationdate', this.localDate);
    this.formData.append('mostlikedpost', 'false');
    this.formData.append('newstpost', 'false');

    this.formData.forEach((value, key) => {
      console.log(`Field name: ${key}`);
      console.log(`Field value: ${value}`);
    });

    const postData = {
      ...this.postForm.value,
      user: {
        idUser: idUser
      }

    };
    this.postService.addPostToUser(this.formData).subscribe(() => {
      console.log("le post a été ajouté")
      location.reload();

      this.closeUpdateModal();
      // 
      //console.log("notre form"+JSON.stringify(this.postForm.value))
      console.log(this.selectedPost);


    })
  }
  closeUpdateModal() {
    // Clear the selected object
    //this.selectedPost =  new post(0, '', '', 0, 0, '', new Date(), false, false, false)
    // Hide the update modal
    this.updateModal.nativeElement.style.display = 'none';
  }
  openUpdateModal(post: any) {
    // Assign the stage object to selectedStage
    this.selectedPost = { ...post }; // Create a copy of the selected post
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }
  closePostupdateModal() {
    this.updateModal.nativeElement.style.display = 'none';
  }
  openPostUpdateModal(post: any) {
    // Assign the stage object to selectedStage
    this.selectedPost = { ...post }; // Create a copy of the selected post
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }
  retrievePostsByidUser(): void {
    this.postService.retrievePostsByidUser(1).subscribe(
      (data: post[] | post) => {
        if (Array.isArray(data)) {
          this.posts = data;
        } else {
          this.posts = [data];
        }
        console.log('Données de la base :', this.posts);
        //location.reload();

      },
      error => {
        console.error('Error retrieving postes:', error);
      });
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
  addLike(idPost: number, idUser: number): void {
    this.postService.addLikeToPostAndUser(idPost, idUser).subscribe(
      response => {
        console.log('Like added successfully:', response);
        // Handle success as needed
      },
      error => {
        console.error('Error adding like:', error);
        // Handle error as needed
      }
    );
  }
}

