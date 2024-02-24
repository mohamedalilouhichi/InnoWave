import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
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
  idUser!: number; // Assuming you have the userId available in the component
  postComments: Comment[] = []; // Array to store post comments
  newComment: string = ''; // Variable to store new comment input
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(); // Initialize as needed
  idPost!: number ; // Replace with the actual post ID
  idComment!:number;
  formData = new FormData();
  selectedFile!: File; 
  date: Date;
  localDate: string;


  comment: Comment = {
    idComment: 0,
    description: '',
    commdate: new Date(),
    likescomment: 0,
    mostlikedcomment: false,
    newstcomment: false
  };

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService, private formBuilder: FormBuilder,private datePipe: DatePipe ) {
    this.date = new Date();
    this.localDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')!;
  }
  postForm!:FormGroup;

  comments: Comment[] = [];
  listPosts:post[]=[];

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
    });
    
    
    this.fetchPosts();
    this.retrievePostsByidUser();

    }
  
  deletePost(idPost: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.removePost(idPost).subscribe(
        () => {
          console.log('Post deleted successfully.');
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
  modifyPost(post: post): void {
    this.postService.modifyPost(post).subscribe(
      modifiedPost => {
        console.log('Post modified successfully.', modifiedPost);
        this.fetchPosts();  // Refresh the posts list
      },
      error => {
        console.error('Error modifying post:', error);
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
  retrieveAllcommentsAffectToidPost() {
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
  }
 
  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  addPostToUser(idUser:string) {
    this.formData.append('idUser', idUser );
    this.formData.append('title', this.postForm.get('title')?.value);
    this.formData.append('description', this.postForm.get('description')?.value);
    this.formData.append('nbrlike', '0');
    this.formData.append('file', this.selectedFile);
    this.formData.append('nbrsave', '0');
    this.formData.append('saved', 'false');
    this.formData.append('creationdate',this.localDate);   
    this.formData.append('mostlikedpost', 'false');  
    this.formData.append('newstpost','false');  
  
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
    this.postService.addPostToUser(this.formData).subscribe(()=>{
      console.log( "le post a été ajouté")
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

  /* addCommentToPostAndUser(idComment: number, idPost: number) {
    if (this.newComment.trim() !== '') {
      const newComment: Comment = {
        id: idComment,
        text: this.newComment
      };

      this.postService.addCommentToPostAndUser(newComment, idPost, this.userId).subscribe(
        response => {
          console.log('Comment added successfully', response);
          // Refresh or update your comments list if needed
          this.loadComments();
          this.newComment = ''; // Clear the new comment input
        },
        error => {
          console.error('Error adding comment', error);
        }
      );
    }
  }*/
  retrievePostsByidUser(): void {
    this.postService.retrievePostsByidUser(this.idUser).subscribe(
      (data: post[] | post ) => {
        if(Array.isArray(data)){
          this.posts = data;
        } else {
        this.posts = [data];
      }
      console.log('Données de la base :', this.posts);
      },
      error => {
        console.error('Error retrieving postes:', error);
      });
  }
  addComment(): void {
    this.postService.addCommentToPostAndUser(this.comment, this.idPost, this.idUser).subscribe(
      (addedComment: Comment) => {
        // Successfully added comment, you can handle it here
        console.log('Comment added:', addedComment);
      },
      (error) => {
        // Handle errors here
        console.error('Error adding comment:', error);
      }
    );
  }
  removeComment(): void {
    this.postService.removecomment(this.idComment).subscribe(
      () => {
        // Successfully removed comment, you can handle it here
        console.log('Comment removed successfully');
      },
      (error) => {
        // Handle errors here
        console.error('Error removing comment:', error);
      }
    );
  }
 /* modifyComment(): void {
    this.postService.modifycomment(this.comment).subscribe(
      (comment: comment) => {
        // Successfully modified comment, you can handle it here
        console.log('Comment modified:', comment);
      },
      (error) => {
        // Handle errors here
        console.error('Error modifying comment:', error);
      }
    );
  }*/
}

