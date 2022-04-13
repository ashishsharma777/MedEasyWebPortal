import {Product} from "../product";

export class Purchase {
  public id?: number;
  public vendorName?: string;
  public products?: Product[];
  public date?: Date;
  public status?: string;
  public reason?: string;

  constructor(
    id?: number,
    vendorName?: string,
    products?: Product[],
    date?: Date,
    status?: string,
    reason?: string
  ) {
    this.id=id?id:null;
    this.vendorName=vendorName?vendorName:null;
    this.products=products?products:[];
    this.date = date ? date : new Date();
    this.status=status?status:null;
    this.reason=reason?reason:null;
  }
}
