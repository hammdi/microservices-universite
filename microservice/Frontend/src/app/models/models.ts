export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface Course {
  id: number;
  name: string;
  teacher: string;
  department: string;
}

export interface Exam {
  id: number;
  course: string;
  date: string;
}

export interface Payment {
  id: number;
  student: string;
  amount: number;
  date: string;
}

export interface Department {
  id: number;
  name: string;
  head: string;
}

export interface User {
  username: string;
  password: string;
}