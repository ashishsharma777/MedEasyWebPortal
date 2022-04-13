import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Requisition} from "./requisition";
import {Demand} from "../product-demand/demand";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private requisitionsUrl = 'http://localhost:8082/api/employees';
  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Requisition[]> {
    return this.http.get<Requisition[]>(this.requisitionsUrl);
  }

  getById(id: number): Observable<Requisition> {
    const url = `${this.requisitionsUrl}/${id}`;
    return this.http.get<Requisition>(url, httpOptions);
  }

  add(requisition: Requisition): Observable<Requisition> {
    return this.http.post<Requisition>(this.requisitionsUrl, requisition, httpOptions);
  }

  getByStatus(status: String): Observable<Requisition[]> {
    // const url1 = `${this.requisitionsUrl}/${id}`+"?search = :status"+status;
    const url1= this.requisitionsUrl+`?search=status:${status}`;
    console.log(url1);
    return this.http.get<Requisition[]>(url1, httpOptions);
  }

  update(requisition: Requisition): Observable<Requisition>{
    const url = `${this.requisitionsUrl}/${requisition.id}`;
    return this.http.put<Requisition>(url, requisition, httpOptions);
  }

  // updateByStatusApproved(id: number): Observable<Requisition>{
  //   const url1= this.requisitionsUrl+"/approve" ;
  //   const url = `${url1}/${id}`;
  //   return this.http.put<Requisition>(url, httpOptions);
  // }
  // updateByStatusDenied(id: number): Observable<Requisition>{
  //   const url1= this.requisitionsUrl+"/deny" ;
  //   const url = `${url1}/${id}`;
  //   return this.http.put<Requisition>(url, httpOptions);
  // }

  // delete(requisition: Requisition | number): Observable<Requisition> {
  //   const id= typeof requisition=== 'number' ? requisition:requisition.id;
  //   const url = `${this.requisitionsUrl}/${id}`;
  //   return this.http.delete<Requisition>(url, httpOptions);
  // }
}
