import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import { Employee }         from '../employee/employee';
import { EmployeeService }  from '../employee/employee.service';

@Component({
  selector: 'lem-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  employeeForm: FormGroup;

  @Input() employee: Employee;
  isNew: boolean;

  constructor(    
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmployee();

    this.employeeForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),      
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      department: this.formBuilder.control('', [Validators.required])
    })
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = (id == '0');
    if(!this.isNew)
      this.employeeService.getEmployee(id)
        .subscribe(employee => this.employee = employee);
    else
    {
      this.employee = new Employee();
    }
  }


  goBack(): void {
    this.location.back();
  }
 
 save(): void {

   if (this.isNew)
   {    
    this.employee._id = undefined;

    this.employeeService.createEmployee(this.employee)
    .subscribe(() => this.goBack());
   }
   else
    this.employeeService.updateEmployee(this.employee)
       .subscribe(() => this.goBack());
  }

}
