import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/students">Students</a></li>
        <li><a routerLink="/teachers">Teachers</a></li>
        <li><a routerLink="/courses">Courses</a></li>
        <li><a routerLink="/exams">Exams</a></li>
        <li><a routerLink="/payments">Payments</a></li>
        <li><a routerLink="/departments">Departments</a></li>
      </ul>
    </nav>
  `
})
export class NavbarComponent {}