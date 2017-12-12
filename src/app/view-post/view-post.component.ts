import { Component, OnInit } from '@angular/core';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: Post;
  id: number;
  constructor(private psp: PostServiceProvider, private route: ActivatedRoute, private router: Router) {
    this.post = new Post(1, '', '', null, null);
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.psp.getPost(this.id)
      .subscribe(data => {
        console.log(data);
        this.post = data;
      }, err => {
        console.log(err);
        this.router.navigate(
          ['/login']);
      });
  }

  ngOnInit() {

  }
}
