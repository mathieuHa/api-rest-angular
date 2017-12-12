import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../Classes/Post';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostwId} from '../../Classes/PostwId';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @Input() post: Post;
  postWid: PostwId;

  private statusok: boolean;
  constructor(private psp: PostServiceProvider, private router: Router) {
    this.statusok = false;
    this.post = new Post(1, '', '', null, null);
  }

  ngOnInit() {

  }

  private editPost() {
    this.statusok = false;
    this.post.edit = false;
    this.postWid = new PostwId(this.post);
    console.log(JSON.stringify(this.post));
    this.psp.editPost(this.postWid, this.post.id)
      .subscribe(data => {
        console.log(data);
        this.statusok = true;
        this.post = data;
      }, err => {
        console.log(err);
        if (err['error']['code'] === 401) {
          this.router.navigate(['/login']);
        }
      });
  }

}
