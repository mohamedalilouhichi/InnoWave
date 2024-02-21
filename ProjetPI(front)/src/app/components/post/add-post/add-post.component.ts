import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { post } from 'src/app/Models/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent  implements OnInit {
  newPost = {
    // other post properties...
  };

  submitForm() {
    // Handle form submission logic here
    console.log(this.newPost);
  }
  posts : post = new post(   0, '', '', 0, 0, '', new Date(),  true,true,true )
    constructor(private postservice: PostService) {}

  ngOnInit(): void {}
  addpost (){
    this.postservice.addPost(this.posts).subscribe({next:(response)=>{
      console.log("post added successfully", response);
 // Handle successful response, e.g., navigate to another page or show a success message
      },
      error: (error) => {
        console.error("There was an error adding the post", error);
        // Handle error case
      }
    });
 
 }
}
