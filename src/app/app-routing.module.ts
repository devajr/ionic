import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule'},
  // { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  // { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  {path: 'cliente',loadChildren:'./pages/cliente/cliente.module#ClientePageModule'},
  {path: 'form-cliente',loadChildren:'./pages/form-cliente/form-cliente.module#FormClientePageModule'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}