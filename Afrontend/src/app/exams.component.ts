import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Exam {
  id: number;
  course: string;
  date: string;
  room: string;
}

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent {
  exams: Exam[] = [
    { id: 1, course: 'CS101', date: '2025-05-10', room: 'Room 101' },
    { id: 2, course: 'MATH201', date: '2025-06-15', room: 'Room 202' }
  ];
}
