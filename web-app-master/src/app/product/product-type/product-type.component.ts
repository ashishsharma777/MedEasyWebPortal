import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductType} from "./product-type";
import {ProductTypeService} from "./product-type.service";

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  productType: ProductType = {};
  toBeAddedProductType: ProductType = new ProductType();
  types: ProductType[] = [];

  constructor(public productTypeService: ProductTypeService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  insert(){
    this.productTypeService.add(this.productType).subscribe(type=>{
      this.toBeAddedProductType = type;
      this.types.push(this.toBeAddedProductType);
      this.productTypeService.refreshEvent.emit();
      this.activeModal.dismiss(true);
    });
  }
}
