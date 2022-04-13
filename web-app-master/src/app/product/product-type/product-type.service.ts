import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "./product-type";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productTypesUrl = 'http://localhost:8082/api/productTypes';

  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.productTypesUrl);
  }

  getById(id: number): Observable<ProductType> {
    const url = `${this.productTypesUrl}/${id}`;
    return this.http.get<ProductType>(url, httpOptions);
  }

  add(productType: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.productTypesUrl, productType, httpOptions);
  }

  // delete(productType: ProductType | number): Observable<ProductType> {
  //   const id= typeof requisition=== 'number' ? requisition:requisition.id;
  //   const url = `${this.productTypesUrl}/${id}`;
  //   return this.http.delete<ProductType>(url, httpOptions);
  // }

  update(productType: ProductType): Observable<ProductType>{
    const url = `${this.productTypesUrl}/${productType.id}`;
    return this.http.put<ProductType>(url, productType, httpOptions);
  }
}
