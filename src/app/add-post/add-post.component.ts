import { Component, OnInit } from '@angular/core';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post: Post;
  private statuserror: boolean;
  private statusok: boolean;
  constructor (private psp: PostServiceProvider, private router: Router) {
    this.statuserror = false;
    this.statusok = false;
    this.post = new Post(1, '', '');
  }

  ngOnInit() {
  }

  private addPost() {
    this.statuserror = false;
    this.statusok = false;
    this.psp.addPosts(this.post)
      .subscribe(data => {
        console.log(data);
        this.statusok = true;
        this.post = data;
        this.router.navigate(
          ['/list']);
      }, err => {
        console.log(err);
        this.statuserror = true;
        this.router.navigate(
          ['/login']);
      });
  }

}
