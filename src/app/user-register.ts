export class UserRegister {
  public username: string;
  public passwordOne: string;
  public passwordSecond: string;
  public email: string;

  constructor(username: string, passwordOne: string, passwordSecond: string, email: string) {
    this.username = username;
    this.passwordOne = passwordOne;
    this.passwordSecond = passwordSecond;
    this.email = email;
  }
}
