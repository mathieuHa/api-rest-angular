import { Component, OnInit } from '@angular/core';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {Router} from '@angular/router';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  postList: Post[];
  constructor(private psp: PostServiceProvider, private router: Router, private auth: AuthServiceProvider) { }

  ngOnInit() {
  }

  private getPosts() {
    this.psp.getPosts()
      .subscribe(data => {
        console.log(data);
        this.postList = data;
      }, err => {
        console.log(err);
        this.auth.logout();
        this.router.navigate(['/login']);
      });
  }
}
