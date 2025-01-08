import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard'; 
import { BooksComponent } from './books/books.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateBookComponent } from './create-book/create-book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },  
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'admin/create-book', component: CreateBookComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'books', component: BooksComponent },  
  { path: 'book/:id', component: BooksComponent, canActivate: [AuthGuard] }, 

  { path: 'admin/create-book', component: CreateBookComponent },  
  { path: '**', redirectTo: '' }  
];
