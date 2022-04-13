import {Product} from "../product/product";

export class Stock {
  public id: number;
  public products: Product[];
  public vendorName: string;
  public vendorContact: string;
  public billno: number;
}
