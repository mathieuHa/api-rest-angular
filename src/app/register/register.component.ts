import { Component, OnInit } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  register() {
    this.statuserror = false;
    this.statusok = false;
    console.log(this.user);
    this.auth.register(this.user['username'], this.user['email'], this.user['plainPasswordfirst'], this.user['plainPasswordsecond'])
      .subscribe(
        data => {
          console.log(data);
          // localStorage.setItem('token', data['access_token']);
          // console.log(JSON.stringify(localStorage));
          // this.auth.setToken();
          this.status = 'Compte crée';
          this.statusok = true;
         this.router.navigate(
            ['/login']);
        },
        error2 => {
          console.log(error2);
          this.statuserror = true;
          this.status = 'Erreur dans la création du compte';
        }
      );
  }
}
