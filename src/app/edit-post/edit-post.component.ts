import { Component, OnInit } from '@angular/core';
import {Post} from '../../Classes/Post';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;
  private statuserror: boolean;
  private statusok: boolean;
  private id: number;
  constructor(private psp: PostServiceProvider, private route: ActivatedRoute, private router: Router) {
    this.statuserror = false;
    this.statusok = false;
    this.post = new Post(1, '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.psp.getPost(this.id)
      .subscribe(data => {
        console.log(data);
        this.post = data;
      }, err => {
        console.log(err);
      });
  }

  private editPost() {
    this.statuserror = false;
    this.statusok = false;
    this.psp.editPost(this.post, this.id)
      .subscribe(data => {
        console.log(data);
        this.statusok = true;
        this.post = data;
      }, err => {
        console.log(err);
        this.statuserror = true;
        this.router.navigate(
          ['/login']);
      });
  }

}
