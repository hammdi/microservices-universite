import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  teachers: Teacher[] = [
    { id: 1, name: 'Dr. Emily Clark', email: 'emily@example.com', subject: 'Physics' },
    { id: 2, name: 'Prof. John Doe', email: 'john@example.com', subject: 'Mathematics' }
  ];
}
