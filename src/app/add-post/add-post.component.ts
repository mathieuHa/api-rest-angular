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
  status: string;
  statusok: boolean;
  isSubmitted: boolean;
  constructor (private psp: PostServiceProvider, private router: Router) {
    this.statusok = false;
    this.isSubmitted = false;
    this.post = new Post(1, '', '');
  }

  ngOnInit() {
  }

  private addPost() {
    this.statusok = false;
    this.psp.addPosts(this.post)
      .subscribe(data => {
        this.status = 'Post ajouté';
        this.isSubmitted = true;
        console.log(data);
        this.statusok = true;
        this.post = data;
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 1500);
      }, err => {
        this.status = 'Erreur dans l\'ajout du post';
        this.isSubmitted = true;
        console.log(err);
      });
  }

}
