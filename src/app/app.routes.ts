import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [{
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: PostFormComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
  }
];
