import { Component, OnInit } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {Router} from '@angular/router';
import {UserLogin} from '../user-login';
import {UserRegister} from '../user-register';
import {flush} from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  status: string;
  statusok: boolean;
  isSubmitted: boolean;
  model = new UserRegister('', '', '', '');
  ngOnInit() {
  }
  constructor(private auth: AuthServiceProvider, private router: Router) {
    this.statusok = false;
    this.isSubmitted = false;
  }

  register() {
    console.log(this.model);
    this.auth.register(this.model['username'], this.model['email'], this.model['passwordOne'], this.model['passwordSecond'])
      .subscribe(
        data => {
          console.log(data);
          this.isSubmitted = true;
          this.status = 'Compte crée';
          this.statusok = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error2 => {
          this.isSubmitted = true;
          console.log(error2);
          this.statusok = false;
          this.status = 'Erreur dans la création du compte';
        }
      );
  }
}
