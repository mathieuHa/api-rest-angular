import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceProvider, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('token_user')) {
      //console.log(stringify(localStorage));
      return true;
    }
    console.log('access denied!');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
