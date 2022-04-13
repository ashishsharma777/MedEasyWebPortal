import {BaseEntity} from "../../base/base-entity";

export class ProductUnit extends BaseEntity {
  public unit?: string;

  constructor(id?: number, unit?: string) {
    super(id);
    this.unit = unit;
  }
}
