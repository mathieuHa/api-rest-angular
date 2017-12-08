import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import {ListPostComponent} from './list-post/list-post.component';
import {AddPostComponent} from './add-post/add-post.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {ViewPostComponent} from './view-post/view-post.component';

const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListPostComponent,  canActivate: [AuthGuard] },
  { path: 'add', component: AddPostComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditPostComponent,  canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewPostComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
