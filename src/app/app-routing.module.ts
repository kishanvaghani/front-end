import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/home/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './gaurds/auth.guard';
import {PreloadAllModules} from '@angular/router'
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) , canActivate:[AuthGuard]},
  { path: 'contact-us', loadChildren: () => import('./components/contact-us/contact-us.module').then(m => m.ContactUsModule), canActivate:[AuthGuard]},
  { path: 'tour', loadChildren: () => import('./components/tour/tour.module').then(m => m.TourModule), canActivate:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy:PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
