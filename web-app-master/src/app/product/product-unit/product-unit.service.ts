import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductUnit} from "./product-unit";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Unit': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService {
  private productUnitsUrl = 'http://localhost:8082/api/productUnits';

  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductUnit[]> {
    return this.http.get<ProductUnit[]>(this.productUnitsUrl);
  }

  getById(id: number): Observable<ProductUnit> {
    const url = `${this.productUnitsUrl}/${id}`;
    return this.http.get<ProductUnit>(url, httpOptions);
  }

  add(productUnit: ProductUnit): Observable<ProductUnit> {
    return this.http.post<ProductUnit>(this.productUnitsUrl, productUnit, httpOptions);
  }

  // delete(productUnit: ProductUnit | number): Observable<ProductUnit> {
  //   const id= Unitof requisition=== 'number' ? requisition:requisition.id;
  //   const url = `${this.productUnitsUrl}/${id}`;
  //   return this.http.delete<ProductUnit>(url, httpOptions);
  // }

  update(productUnit: ProductUnit): Observable<ProductUnit>{
    const url = `${this.productUnitsUrl}/${productUnit.id}`;
    return this.http.put<ProductUnit>(url, productUnit, httpOptions);
  }
}
