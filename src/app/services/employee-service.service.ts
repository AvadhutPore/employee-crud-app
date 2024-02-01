import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';




@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl = 'https://employee-info.onrender.com/posts';

  constructor( private http: HttpClient) { }

  getEmployee() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  postEmployee(emp: Employee) {
    return this.http.post<Employee>(this.baseUrl, emp);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  updateEmployee(id: number , data:Employee) {
    return this.http.put(this.baseUrl + '/' + id , data);
  }


  



}
