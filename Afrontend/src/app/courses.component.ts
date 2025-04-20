import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  code: string;
  title: string;
  credits: number;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Course[] = [
    { code: 'CS101', title: 'Intro to CS', credits: 3 },
    { code: 'MATH201', title: 'Calculus II', credits: 4 }
  ];
}
