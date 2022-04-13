import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8082/api/products';
  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url, httpOptions);
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

  // deleteProduct(requisition: Product | number): Observable<Product> {
  //   const id= typeof requisition=== 'number' ? requisition:requisition.id;
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.delete<Product>(url, httpOptions);
  // }

  // update(product: Product): Observable<Product>{
  //   const url = `${this.productsUrl}/${product.id}`;
  //   return this.http.put<Product>(url, product, httpOptions);
  // }
}
