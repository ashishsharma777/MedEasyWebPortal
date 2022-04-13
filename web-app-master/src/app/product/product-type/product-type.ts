import {BaseEntity} from "../../base/base-entity";

export class ProductType extends BaseEntity {
  public type?: string;

  constructor(id?: number, type?: string) {
    super(id);
    this.type = type;
  }
}
