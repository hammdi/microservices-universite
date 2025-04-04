import { Injectable } from '@angular/core';
import { Student, Teacher, Course, Exam, Payment, Department } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Computer Science' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Mathematics' }
  ];

  private teachers: Teacher[] = [
    { id: 1, name: 'Prof. Johnson', email: 'johnson@example.com', department: 'Computer Science' },
    { id: 2, name: 'Dr. Williams', email: 'williams@example.com', department: 'Mathematics' }
  ];

  private courses: Course[] = [
    { id: 1, name: 'Programming 101', teacher: 'Prof. Johnson', department: 'Computer Science' },
    { id: 2, name: 'Calculus', teacher: 'Dr. Williams', department: 'Mathematics' }
  ];

  private exams: Exam[] = [
    { id: 1, course: 'Programming 101', date: '2024-03-15' },
    { id: 2, course: 'Calculus', date: '2024-03-20' }
  ];

  private payments: Payment[] = [
    { id: 1, student: 'John Doe', amount: 1000, date: '2024-02-01' },
    { id: 2, student: 'Jane Smith', amount: 1000, date: '2024-02-01' }
  ];

  private departments: Department[] = [
    { id: 1, name: 'Computer Science', head: 'Prof. Johnson' },
    { id: 2, name: 'Mathematics', head: 'Dr. Williams' }
  ];

  // Students CRUD
  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }

  // Teachers CRUD
  getTeachers(): Teacher[] {
    return this.teachers;
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  updateTeacher(teacher: Teacher): void {
    const index = this.teachers.findIndex(t => t.id === teacher.id);
    if (index !== -1) {
      this.teachers[index] = teacher;
    }
  }

  deleteTeacher(id: number): void {
    this.teachers = this.teachers.filter(t => t.id !== id);
  }

  // Similar CRUD operations for other entities...
  getCourses(): Course[] {
    return this.courses;
  }

  getExams(): Exam[] {
    return this.exams;
  }

  getPayments(): Payment[] {
    return this.payments;
  }

  getDepartments(): Department[] {
    return this.departments;
  }
}