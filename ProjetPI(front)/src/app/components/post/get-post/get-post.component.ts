import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { post } from 'src/app/Models/post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrls: ['./get-post.component.css']
})
export class GetPostComponent  implements OnInit  {
  posts: any[] = [];
  newPost: any = {}; // Define newPost object for adding posts
  selectedPost: any = {}; // Define selectedPost object for updating posts

  @ViewChild('updateModal') updateModal!: ElementRef;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.fetchPosts();
  }
 

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedPost.file = file; // Assign the selected file to your post object
    }
  }


  fetchPosts() {
    this.postService.getPost().subscribe((data: any[]) => {
      console.log(data);
      this.posts = data.map(post => ({
        ...post,
        creationDate: new Date(post.creationDate)  // Convert string to Date object
      }));
    });
  }
  
 
  openUpdateModal(post: any) {
    // Assign the stage object to selectedStage
    this.selectedPost = { ...post }; // Create a copy of the selected post
    // Show the update modal
    this.updateModal.nativeElement.style.display = 'block';
  }
  addPost() {
    if (
      this.newPost.title &&
      this.newPost.description &&
      this.newPost.file
    ) {
      this.newPost.creationDate = this.getCurrentDateTime();

      this.postService.addPost(this.newPost).subscribe(() => {
        this.newPost = {};
        this.fetchPosts();
      });
    } else {
      console.error('All required fields must be filled.');
    }
  }
  getCurrentDateTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZoneName: 'short'
    };
    return new Date().toLocaleString('en-US', options);
  }
  formatDateTime(dateTimeString: string): Date {
    // Check if the string is not empty
    if (dateTimeString) {
      return new Date(dateTimeString);
    } else {
      return new Date(); // or handle empty date as needed
    }
  }
  
  
      deletePost(post: any) {
      this.postService.deletePost(post).subscribe(() => {
        // Success handling
        this.fetchPosts();
      }, error => {
        // Error handling
        console.error('Error deleting post:', error);
      });
    }
    closeUpdateModal() {
      // Clear the selected object
      this.selectedPost = {};
      // Hide the update modal
      this.updateModal.nativeElement.style.display = 'none';
    }
    updatePost() {
      this.postService.updatePost(this.selectedPost).subscribe(() => {
        this.selectedPost = {};
        this.fetchPosts();
        // Close the update modal after successful update
        this.closeUpdateModal();
      }, error => {
        console.error('Error updating post:', error);
      });
    }

}

