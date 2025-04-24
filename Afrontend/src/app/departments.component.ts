import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Department {
  id: number;
  name: string;
  head: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
  departments: Department[] = [
    { id: 1, name: 'Computer Science', head: 'Dr. Emily Clark' },
    { id: 2, name: 'Mathematics', head: 'Prof. John Doe' }
  ];
}
