import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostServiceProvider} from '../../providers/post-service/post-service';
import {Post} from '../../Classes/Post';
import {Router} from '@angular/router';
import {PostwId} from '../../Classes/PostWId';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Input() post: Post;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  postWid: PostwId;
  status: string;
  statusok: boolean;
  isSubmitted: boolean;
  constructor (private psp: PostServiceProvider, private router: Router) {
    this.statusok = false;
    this.isSubmitted = false;
    this.post = new Post(1, '', '', null, null);
  }

  ngOnInit() {
  }

  private addPost() {
    this.isSubmitted = true;
    this.statusok = false;
    this.postWid = new PostwId(this.post);
    this.psp.addPosts(this.postWid)
      .subscribe(data => {
        this.status = 'Post ajouté';
        console.log(data);
        this.statusok = true;
        this.post = data;
        console.log('Log Post in add' + JSON.stringify(this.post));
        this.notify.emit(JSON.stringify(this.post));
        this.isSubmitted = false;

      }, err => {
        console.log(err['error']['code']);
        this.isSubmitted = false;
        this.status = 'Erreur dans l\'ajout du post';
        console.log(err);
        if (err['error']['code'] === 401) {
          this.router.navigate(['/login']);
        }
      });
  }



}
