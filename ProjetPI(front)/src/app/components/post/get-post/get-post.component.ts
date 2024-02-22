import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { post } from 'src/app/Models/post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrls: ['./get-post.component.css']
})
export class GetPostComponent  implements OnInit  {
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts
  selectedPost: post = new post(0, '', '', 0, 0, new File([], 'dummy.txt'), new Date(), false, false, false); // Initialize as needed
  newComment: string = ''; // Variable to store new comment input

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      nbrlike: [0, Validators.required],
      nbrsave: [0, Validators.required],
      creationdate: [new Date(), Validators.required],
      mostlikedpost: [false, Validators.required],
      newstpost: [false, Validators.required],
      file: [null]
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
  }
 addPost() {
    const formData = new FormData();
    const newPost: post = { ...this.newPostForm.value };
    if (newPost.file instanceof File) {
      formData.append('file', newPost.file);
    }
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    formData.append('nbrlike', newPost.nbrlike.toString());
    formData.append('nbrsave', newPost.nbrsave.toString());
    formData.append('creationdate', newPost.creationdate.toISOString());
    formData.append('mostlikedpost', newPost.mostlikedpost.toString());
    formData.append('newstpost', newPost.newstpost.toString());
    console.log('FormData:', formData);

    this.postService.addPost(post).subscribe(
      () => {
        console.log('Post added successfully.');
        this.newPostForm.reset();
        this.fetchPosts();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }
  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedPost.file = file; // Assign the selected file to your post object
    }
  }


  fetchPosts() {
    this.postService.getPost().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  
  getPost() {
    this.postService.getPost().subscribe(
      data => {
        this.posts = data;
        console.log('Données de la base :', this.posts);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des compétences :', error);
      }
    );
  }
  openUpdateModal(post: any) {
    // Assign the stage object to selectedStage
    this.selectedPost = { ...post }; // Create a copy of the selected post
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
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
  
    closeUpdateModal() {
      // Clear the selected object
      this.selectedPost =  new post(0, '', '', 0, 0, new File([], 'dummy.txt'), new Date(), false, false, false)
      // Hide the update modal
      this.updateModal.nativeElement.style.display = 'none';
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

}

