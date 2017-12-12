import {User} from './User';

export class Post {
  public id: number;
  public titre: string;
  public texte: string;
  public comments: Comment[];
  public user: User;
  public edit: boolean;

  public constructor (id: number, titre: string, texte: string, comments: Comment[], user: User) {
    this.edit = false;
  }

  toString() {
    return 'Post' + this.id + ' ' + this.titre + ' ' + this.texte;
  }
}
