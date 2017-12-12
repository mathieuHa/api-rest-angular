import { Component, OnInit } from '@angular/core';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {Router} from '@angular/router';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate(250, style({height: 0}))
      ])
    ])
  ]
})
export class ListPostComponent implements OnInit {
  postList: Post[];
  post: Post;
  constructor(private psp: PostServiceProvider, private router: Router, private auth: AuthServiceProvider) {
    this.post = new Post(1, '', '', null, null);
  }

  ngOnInit() {
    this.getPosts();
  }
  private deletePost(post) {
    const index = this.postList.indexOf(post);
    this.psp.deletePost(post.id)
      .subscribe(data => {
        console.log(data);
        if (index > -1) {
          this.postList.splice(index, 1);
        }
        }, err => {
        console.log(err);
        }
      );
  }

  private editPost(post: Post) {
    post.edit = true;
  }

  private getPosts() {
    this.psp.getPosts()
      .subscribe(data => {
        console.log(data);
        this.postList = data;
        console.log('affichage de la liste :' + JSON.stringify(this.postList));
        this.postList.reverse();
      }, err => {
        console.log(err);
        console.log(err['error']['code']);
        if (err['error']['code'] === 401) {
          this.router.navigate(['/login']);
        }
      });
  }
  onNotify(post): void {
    console.log('Log Post on Notify' + post);
    this.postList.splice(0, 0, JSON.parse(post));
    this.post = new Post(1, '', '', null, null);
  }
}
