import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from './services/employee-service.service';
import { Employee } from './models/employee.model';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Employee-Crud-App';

  @ViewChild('fileInput') FileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  @ViewChild('insertEmployee') insertEmployee: any;
  employeeForm: FormGroup;

  isEditActive = false;
  selectedEmployeeId:number = 0;
  employees: Employee[];
  employeesToDisplay: Employee[]; 
  educationOptions = [
    '10th pass',
    '12th pass',
    'diploma',
    'graduate',
    'post graduate',
    'phd',
  ]

  constructor(private fb: FormBuilder, private empService: EmployeeService ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }



  ngOnInit(): void {
    this.isEditActive = false;
    this.employeeForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    this.empService.getEmployee().subscribe(res => {
      for(let emp of res){
      this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    })

 
    
  }

  addEmployee() {
    this.isEditActive = false;
    // creating single Employee
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthday: this.Birthday.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.FileInput.nativeElement.files[0]?.name,
    }


    this.empService.postEmployee(employee).subscribe((resEmp) => {
      this.employees.unshift(resEmp);
      this.clearForm();

    })
  

    console.log(this.employees);
  }

  editEmployee(evt : number) {
    this.selectedEmployeeId = evt;
    this.employees.forEach((val , index) => {
      if(val.id == evt) {
        this.setForm(val);
      }
    });
    this.addEmployeeButton.nativeElement.click();
    this.isEditActive = true;
  }
  updateEmployee() {
        // creating single Employee
        let employee: Employee = {
          firstname: this.FirstName.value,
          lastname: this.LastName.value,
          birthday: this.Birthday.value,
          gender: this.Gender.value,
          education: this.educationOptions[parseInt(this.Education.value)],
          company: this.Company.value,
          jobExperience: this.JobExperience.value,
          salary: this.Salary.value,
          profile: this.FileInput.nativeElement.files[0]?.name,
        }

        console.log(this.selectedEmployeeId);
        this.empService.updateEmployee(this.selectedEmployeeId , employee).subscribe((res) => {
          if(res) {
            console.log(employee);
            const index = this.employees.findIndex((val) => val.id === this.selectedEmployeeId);
            if (index !== -1) {
              this.employees[index] = employee;
              this.clearForm();
            }
    
          }


        })
        this.clearForm();
  }



  removeEmployee(evt : number) {
    this.employees.forEach((val , index) => {
      if(val.id == evt) {
        this.empService.deleteEmployee(evt).subscribe((res) => {
          this.employees.splice(index , 1);
        })
      }
    })
  }




  searchEmployee(searchVal:any) {
    let filteredEmployees: Employee[] = []; 

    if(searchVal == ''){
      this.employeesToDisplay = this.employees;
    }
    else {
      filteredEmployees = this.employees.filter((val , index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = searchVal.toLowerCase();
        return targetKey.includes(searchKey);
      }) 
      this.employeesToDisplay = filteredEmployees;
    }
  }


  setForm(emp : Employee) {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.Birthday.setValue(emp.birthday);
    this.Gender.setValue(emp.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val , index) =>{
      if(val == emp.education) {
        educationIndex = index;
      }
    })
    this.Education.setValue(educationIndex);

    this.Company.setValue(emp.company);
    this.JobExperience.setValue(emp.jobExperience);
    this.Salary.setValue(emp.salary);
    this.FileInput.nativeElement.value = '';
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Birthday.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.FileInput.nativeElement.value = '';
  }

 

  // Getters
  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get Birthday(): FormControl {
    return this.employeeForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl;
  }
  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl;
  }
  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl;
  }
  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl;
  }


 

  

}
