import { Component, OnInit } from '@angular/core';

import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selectedStudentIds: number[] = [];
  bsModalREf: BsModalRef;

  constructor(private studentService: StudentService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadStudents();

  }

  openAddForm() {
    this.bsModalREf = this.modalService.show(StudentCreateComponent);
    this.bsModalREf.content.saveEvent.subscribe((newStudent: Student) => {
      this.studentService.addStudent(newStudent);
      this.students = this.studentService.getStudents();
    });
  }

  openEditForm(student: Student): void {
    const initialState = {
      student: { ...student } 
    };
    this.bsModalREf = this.modalService.show(StudentEditComponent, { initialState });
    this.bsModalREf.content.saveEvent.subscribe((updatedStudent: Student) => {
      const index = this.students.findIndex(s => s.id === updatedStudent.id);
      if (index !== -1) {
        this.students[index] = updatedStudent;
      }
    });
  }

  toggleSelection(studentId: number) {
    const index = this.selectedStudentIds.indexOf(studentId);
    if (index !== -1) {
      this.selectedStudentIds.splice(index, 1);
    } else {
      this.selectedStudentIds.push(studentId);
    }
    console.log(this.selectedStudentIds)
  }

  deleteSelectedStudents() {
    this.studentService.deleteSelectedStudents(this.selectedStudentIds);
    this.students = this.studentService.getStudents();
    this.selectedStudentIds = [];
  }
  onDeleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
    }

}