import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  @Input() getEmployee : Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();

  constructor(){
    this.getEmployee = {
      firstname: "",
      lastname: "",
      birthday: "",
      gender: "",
      education: "",
      company: "",
      jobExperience: 0,
      salary: 0,
      profile: "",
    }
  }

  ngOnInit(): void {
    console.log(this.getEmployee);
  }

  deleteEmployeeClick() {
    this.onRemoveEmployee.emit(this.getEmployee.id);
  }

  editEmployeeClick() {
    this.onEditEmployee.emit(this.getEmployee.id);
  }
  

}
