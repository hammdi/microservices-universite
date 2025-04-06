import { Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  // Add routes for other components
];