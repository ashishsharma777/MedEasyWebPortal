import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demand} from "./demand";
import {Requisition} from "../product-requisition/requisition";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  tranferProductType= new EventEmitter();
  // tranferProductName= new EventEmitter();
  private demandsUrl = 'http://localhost:8082/api/demands';

  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Demand[]> {
    return this.http.get<Demand[]>(this.demandsUrl);
  }

  getById(id: number): Observable<Demand> {
    const url = `${this.demandsUrl}/${id}`;
    return this.http.get<Demand>(url, httpOptions);
  }

  add(demand: Demand): Observable<Demand> {
    return this.http.post<Demand>(this.demandsUrl, demand, httpOptions);
  }

  getByStatus(status: string): Observable<Demand> {
    const url= this.demandsUrl+"?search = status:"+status ;
    // const url = `${url1}/${status}`;
    return this.http.get<Demand>(url, httpOptions);
  }

  update(demand: Demand): Observable<Demand>{
    const url = `${this.demandsUrl}/${demand.id}`;
    return this.http.put<Requisition>(url, demand, httpOptions);
  }

  // delete(demand: Demand | number): Observable<Demand> {
  //   const id= typeof demand=== 'number' ? demand:demand.id;
  //   const url = `${this.demandsUrl}/${id}`;
  //   return this.http.delete<Demand>(url, httpOptions);
  // }
}
