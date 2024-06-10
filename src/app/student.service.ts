import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    {id: 1, name:'ahmed saber',email:'ahmed.saber@ahmed.com', age: 22,dateOfBirth: new Date('2024-01-01'), gender: 'Male'},
    {id: 2, name:'ahmed saber',email:'ahmed.saber@ahmed.com', age: 22,dateOfBirth: new Date('2024-01-01'), gender: 'Male'},
    {id: 3, name:'ahmed saber',email:'ahmed.saber@ahmed.com', age: 22,dateOfBirth: new Date('2024-01-01'), gender: 'Male'},
  ]
  private id: number = 2

  constructor() { }

  getStudents() {
    return this.students;
  }

  addStudent(student: Student) {
    student.id = this.id++;
    this.students.push(student);
  }

  updateStudent(updatedStudent: Student) {
    const index = this.students.findIndex(
      (student) => student.id === updatedStudent.id
    );
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(student => student.id !== id )
  }
  
  deleteSelectedStudents(ids: number[]) {
    this.students = this.students.filter(
      (student) => !ids.includes(student.id)
    );
  }
}