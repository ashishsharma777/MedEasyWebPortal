import {BaseEntity} from "../base/base-entity";
import {ProductUnit} from "./product-unit/product-unit";
import {ProductType} from "./product-type/product-type";

export class Product extends BaseEntity {
  public name?: string;
  public specification?: string;
  public quantity?: number;
  public productType?: ProductType;
  public productUnit?: ProductUnit;

  constructor(id?: number, name?: string, specification?: string, unit?: string, quantity?: number, productType?: ProductType,
              productUnit?: ProductUnit) {
    super(id);
    this.name = name ? name : null;
    this.specification = specification ? specification : null;
    this.quantity = quantity ? quantity : null;
    this.productType = productType ? productType : null;
    this.productUnit = productUnit ? productUnit : null;
  }
}


