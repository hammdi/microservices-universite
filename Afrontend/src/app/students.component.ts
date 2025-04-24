import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students: Student[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Computer Science' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Mathematics' }
  ];
}
