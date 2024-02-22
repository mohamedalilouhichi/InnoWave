import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../post.service';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number; // Assuming you have the userId available in the component
  postComments: Comment[] = []; // Array to store post comments
  newComment: string = ''; // Variable to store new comment input
  posts: any[] = [];
  newPostForm!: FormGroup; // Define selectedPost object for updating posts


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
  }  ngOnInit(): void {
    this.fetchPosts();
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
  fetchPosts() {
    this.postService.getPost().subscribe(data => {
      this.posts = data;
    });
  }
  loadComments() {
    // Call a service method to get comments for the user's posts
    this.postService.getCommentsForUser(this.userId).subscribe(
      (comments: Comment[]) => {
        this.postComments = comments;
      },
      error => {
        console.error('Error loading comments:', error);
      }
    );
  }

  addComment(idcomment: number) {
    if (this.newComment.trim() !== '') {
      this.postService.addCommentToPost(idcomment, this.newComment).subscribe(
        response => {
          console.log('Comment added successfully', response);
          // Refresh or update your comments list if needed
          this.loadComments();
        },
        error => {
          console.error('Error adding comment', error);
        }
      );
    }
  }
  isOwnComment(comment: Comment): boolean {
    // Your implementation here
    return false; // Replace with your logic
}
likeComment(comment: Comment) {
  // Your implementation here
}
}

