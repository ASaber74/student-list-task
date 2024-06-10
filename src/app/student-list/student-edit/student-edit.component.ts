import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Student } from 'src/app/student.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  genderList = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' }
  ];


  @Input() student: Student = {
    id: 0,
    name: '',
    email: '',
    age: null,
    dateOfBirth: null,
    gender: '',
  };
  @Output() saveEvent = new EventEmitter<Student>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onEdit(editStudent: NgForm): void {
    if (editStudent.valid) {
    this.saveEvent.emit(this.student);
    this.bsModalRef.hide();
    }
  }
}