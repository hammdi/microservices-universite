import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="content-container">
      <h2>Students Management</h2>
      
      <!-- Search -->
      <div class="search-bar">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Search students by name, email or department..."
        >
      </div>
      
      <!-- Add/Edit Form -->
      <form (ngSubmit)="onSubmit()">
        <input 
          type="text" 
          [(ngModel)]="currentStudent.name" 
          name="name" 
          placeholder="Student Name"
          required
        >
        <input 
          type="email" 
          [(ngModel)]="currentStudent.email" 
          name="email" 
          placeholder="Student Email"
          required
        >
        <input 
          type="text" 
          [(ngModel)]="currentStudent.department" 
          name="department" 
          placeholder="Department"
          required
        >
        <button type="submit">
          {{ editing ? 'Update' : 'Add New' }} Student
        </button>
      </form>

      <!-- List -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of filteredStudents">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.department }}</td>
            <td class="action-buttons">
              <button class="edit-button" (click)="editStudent(student)">
                Edit
              </button>
              <button class="delete-button" (click)="deleteStudent(student.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StudentsComponent {
  students: Student[] = [];
  currentStudent: Student = { id: 0, name: '', email: '', department: '' };
  editing = false;
  searchTerm = '';

  constructor(private dataService: DataService) {
    this.students = this.dataService.getStudents();
  }

  get filteredStudents(): Student[] {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSubmit(): void {
    if (this.editing) {
      this.dataService.updateStudent(this.currentStudent);
    } else {
      this.currentStudent.id = this.students.length + 1;
      this.dataService.addStudent(this.currentStudent);
    }
    this.resetForm();
    this.students = this.dataService.getStudents();
  }

  editStudent(student: Student): void {
    this.currentStudent = { ...student };
    this.editing = true;
  }

  deleteStudent(id: number): void {
    this.dataService.deleteStudent(id);
    this.students = this.dataService.getStudents();
  }

  resetForm(): void {
    this.currentStudent = { id: 0, name: '', email: '', department: '' };
    this.editing = false;
  }
}