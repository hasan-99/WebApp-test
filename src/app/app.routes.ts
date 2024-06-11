import { Route, Routes } from '@angular/router';
import { SignInComponent } from './Home/components/sign-in/sign-in.component';

export const routes: Routes = [

          { path: '', redirectTo: '/auth/login-page', pathMatch: 'full' },
        
        
          { path: 'auth', loadChildren: () => import('./Home/components/home-rout') },

]
