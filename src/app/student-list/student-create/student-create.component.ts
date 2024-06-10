import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Student } from 'src/app/student.model';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  genderList = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' }
  ];

  student: Student = {
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

  onAdd(form: any): void {
    if (form.valid) {
      this.saveEvent.emit(this.student);
      this.bsModalRef.hide();
    }
  }
}
