import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {PostServiceProvider} from '../providers/post-service/post-service';
import { LoginComponent } from './login/login.component';
import { ListPostComponent } from './list-post/list-post.component';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import {AuthGuard} from './auth.guard';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListPostComponent,
    RegisterComponent,
    AddPostComponent,
    EditPostComponent,
    ViewPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthServiceProvider,
    PostServiceProvider,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
