import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import {Employee} from './employee'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'http://localhost:3000/employees';  // URL to web api

  

  constructor( private http: HttpClient) { }

  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

    /** GET employee by id. Will 404 if id not found */
    getEmployee(id: string): Observable<Employee> {
      const url = `${this.employeesUrl}/${id}`;
      return this.http.get<Employee>(url).pipe(
        tap(_ => this.log(`fetched employee id=${id}`)),
        catchError(this.handleError<Employee>(`employee id=${id}`))
      );
    }

    /** POST: update the hero on the server */
    createEmployee (employee: any): Observable<any> {
      const url = `${this.employeesUrl}`;
      return this.http.post(url, employee, httpOptions).pipe(
        tap(_ => this.log(`create employee id=${employee}`)),
        catchError(this.handleError<any>('createEmployee'))
      );    
    }

    /** PUT: update the hero on the server */
    updateEmployee (employee: Employee): Observable<any> {
      const url = `${this.employeesUrl}/${employee._id}`;
      return this.http.put(url, employee, httpOptions).pipe(
        tap(_ => this.log(`updated employee id=${employee._id}`)),
        catchError(this.handleError<any>('updateEmployee'))
      );    
    }

    /** delete: update the hero on the server */
    deleteEmployee (employee: Employee): Observable<any> {
        const url = `${this.employeesUrl}/${employee._id}`;
        return this.http.delete(url,  httpOptions).pipe(
          tap(_ => this.log(`deleteEmployee hero id=${employee._id}`)),
          catchError(this.handleError<any>('deleteEmployee'))
        );    
    }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`EmployeeService: ${message}`);
  }


}
