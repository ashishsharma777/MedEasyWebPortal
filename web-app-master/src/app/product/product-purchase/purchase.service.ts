import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Purchase} from "./purchase";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchasesUrl = 'http://localhost:8082/api/purchases';
  refreshEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchasesUrl);
  }

  getById(id: number): Observable<Purchase> {
    const url = `${this.purchasesUrl}/${id}`;
    return this.http.get<Purchase>(url, httpOptions);
  }

  add(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchasesUrl, purchase, httpOptions);
  }

  getByStatus(status: string): Observable<Purchase> {
    const url1= this.purchasesUrl+"/status" ;
    const url = `${url1}/${status}`;
    return this.http.get<Purchase>(url, httpOptions);
  }

  // delete(purchase: Purchase | number): Observable<Purchase> {
  //   const id= typeof purchase=== 'number' ? purchase:purchase.id;
  //   const url = `${this.purchasesUrl}/${id}`;
  //   return this.http.delete<Purchase>(url, httpOptions);
  // }

}
