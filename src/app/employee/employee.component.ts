import { Component, OnInit } from '@angular/core';
import { Employee } from './employee'
import { EmployeeService } from './employee.service'


@Component({
  selector: 'lem-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
    console.log(this.employees);
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  delete(employee: Employee): void {

    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}
