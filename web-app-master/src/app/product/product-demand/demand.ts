import {Product} from "../product";

export class Demand {
  public id?: number;
  public stockUserName?: string;
  public products?: Product[];
  public date?: Date;
  public status: string;
  public reason: string;

  constructor(
    id?: number,
    stockUserName?: string,
    products?: Product[],
    date?: Date,
    status?: string,
    reason?: string
  ) {
    this.id=id?id:null;
    this.stockUserName=stockUserName?stockUserName:null;
    this.products=products?products:[];
    this.date = date ? date : new Date();
    this.status=status?status:null;
    this.reason=reason?reason:null;
  }
}
