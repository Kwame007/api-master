import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AuthGuard } from './services/authentication.service';

export const routes: Routes = [{
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: PostFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: PostFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
  }
];
