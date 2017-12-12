import {Post} from './Post';

export class PostwId {
  public titre: string;
  public texte: string;


  public constructor (post: Post) {
    this.texte = post.texte;
    this.titre = post.titre;
  }

  toString() {
    return 'Post' + this.titre + ' ' + this.texte;
  }
}
