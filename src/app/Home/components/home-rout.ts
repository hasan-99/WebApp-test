import { Route } from '@angular/router';

export default [
          { path: '', redirectTo: '/auth/login-page', pathMatch: 'full' },

          { path: 'login-page', loadComponent: () => import('./sign-in/sign-in.component').then((c) => c.SignInComponent) },
          { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },

] as Route[];