import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ProtectedContentComponent } from './components/protected/protected-content.component';

export const routes: Routes = [
  {
  path: '', component: LoginComponent,
  },
  {
    path: 'protected-content',
    component: ProtectedContentComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
