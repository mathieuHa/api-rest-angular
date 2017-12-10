import { Component, OnInit } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {Router, RouterModule} from "@angular/router";
import {templateJitUrl} from "@angular/compiler";
import {UserLogin} from "../user-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string;
  statusok: boolean;
  isSubmitted: boolean;
  model = new UserLogin('', '');

  ngOnInit() {
  }
  constructor(private auth: AuthServiceProvider, private router: Router) {
    this.statusok = false;
    this.isSubmitted = false;
    this.status = '';
  }

  login() {
    console.log('I am submitted');
    console.log(this.model);
    this.auth.login(this.model['username'], this.model['password'])
      .subscribe(
        data => {
          this.isSubmitted = true;
          console.log(data);
          localStorage.setItem('token_user', data['token']);
          this.status = 'Connection validée';
          this.statusok = true;
          setTimeout(() => {
            this.router.navigate(['/list']);
          }, 1500);
        },
        error2 => {
          this.isSubmitted = true;
          console.log(error2);
          this.statusok = false;
          this.status = 'Erreur d\'autentification';
        }
      );
  }
}
