import { Component, OnInit } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string;
  statuserror: boolean;
  statusok: boolean;
  ngOnInit() {
  }
  constructor(private auth: AuthServiceProvider, private router: Router) {
    this.statuserror = false;
    this.statusok = false;
  }
  user = {};

  login() {
    this.statuserror = false;
    this.statusok = false;
    console.log(this.user);
    this.auth.login(this.user['username'], this.user['password'])
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token_user', data['access_token']);
          this.auth.setToken();
          this.status = 'Connection validée';
          this.statusok = true;
          this.router.navigate(
            ['/list']);
        },
        error2 => {
          console.log(error2);
          this.statuserror = true;
          this.status = 'Erreur d\'autentification';
        }
      );
  }
}
