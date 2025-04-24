import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { StudentsComponent } from './students.component';
import { TeachersComponent } from './teachers.component';
import { CoursesComponent } from './courses.component';
import { PaymentsComponent } from './payments.component';
import { DepartmentsComponent } from './departments.component';
import { ExamsComponent } from './exams.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'exams', component: ExamsComponent },
  // Future routes for admin/dashboard/pages will go here
];
