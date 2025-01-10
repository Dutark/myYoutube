import {Routes} from '@angular/router';
import {RegisterComponent} from '../pages/register/register.component';
import {LoginComponent} from '../pages/login/login.component';
import {HomeComponent} from '../pages/home/home.component';
import {VideoViewerComponent} from '../pages/video-viewer/video-viewer.component';
import {UserComponent} from '../pages/user/user.component';
import {MessagesComponent} from '../pages/messages/messages.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: UserComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'videoViewer/:id', component: VideoViewerComponent},
];
