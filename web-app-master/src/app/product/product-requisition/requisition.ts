import {Product} from "../product";

export class Requisition {
  public id: number;
  public employeeName: string;
  public designation: string;
  public products: Product[];
  public departmentName: string;
  public purpose: string;
  public date: Date;
  public status: string;
  public reason: string;

  constructor(id?: number, employeeName?: string, designation?: string, products?: Product[],
              departmentName?: string, purpose?: string, date?: Date, status?: string, reason?: string) {
    this.id = id ? id : null;
    this.employeeName = employeeName ? employeeName : '';
    this.designation = designation ? designation : '';
    this.products = products ? products : [];
    this.departmentName = departmentName ? departmentName : '';
    this.purpose = purpose ? purpose : '';
    this.date = date ? date : new Date();
    this.status = status ? status : '';
    this.reason = reason ? reason : '';
  }
}
