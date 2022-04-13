import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductUnit} from "./product-unit";
import {ProductUnitService} from "./product-unit.service";

@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.css']
})
export class ProductUnitComponent implements OnInit {

  productUnit: ProductUnit = {};
  toBeAddedProductUnit: ProductUnit = new ProductUnit();
  units: ProductUnit[] = [];

  constructor(public productUnitService: ProductUnitService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  insert(){
    this.productUnitService.add(this.productUnit).subscribe(unit=>{
      this.toBeAddedProductUnit = unit;
      this.units.push(this.toBeAddedProductUnit);
      this.productUnitService.refreshEvent.emit();
      this.activeModal.dismiss(true);
    });
  }
}
