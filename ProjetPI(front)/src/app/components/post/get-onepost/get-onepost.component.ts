import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

interface PostComment {
  description: string;
  // other properties if needed
}

@Component({
  selector: 'app-get-onepost',
  templateUrl: './get-onepost.component.html',
  styleUrls: ['./get-onepost.component.css']
})
export class GetOnepostComponent implements OnInit {
  postId: number = 1; // Replace with the actual post ID or set it dynamically
  comments: any[] = [];
  newComment: PostComment = { description: '' };
  selectedComment: any = {};
  newCommentForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required]
  });

  constructor(private postservice: PostService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.postservice.getComment().subscribe((data: any[]) => {
      console.log(data);
      this.comments = data;
    });
  }
/*
// Assuming PostComment extends Comment
addCommentToPost(postId: number, comment: PostComment): void {
  const commentObject: { data: string } = {
    data: comment.description,
  };
  this.postservice.addCommentToPost(postId,commentObject  ).subscribe(
    () => {
      console.log('Comment added successfully.');
      this.fetchComments();
    },
    error => {
      console.error('Error adding comment:', error);
    }
  );
}*/

  deleteComment(comment: any): void {
    this.postservice.deleteComment(comment).subscribe(
      () => {
        // Success handling
        this.fetchComments();
      },
      error => {
        // Error handling
        console.error('Error deleting stage:', error);
      }
    );
  }

  updateComment(): void {
    this.postservice.updateComment(this.selectedComment).subscribe(
      () => {
        this.selectedComment = {};
        this.fetchComments();
        // Close the update modal after successful update
      },
      error => {
        console.error('Error updating post:', error);
      }
    );
  }
}
