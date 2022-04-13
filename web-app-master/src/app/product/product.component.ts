import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ProductType} from "./product-type/product-type";
import {ProductTypeService} from "./product-type/product-type.service";
import {ProductTypeComponent} from "./product-type/product-type.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductUnitComponent} from "./product-unit/product-unit.component";
import {ProductUnit} from "./product-unit/product-unit";
import {ProductUnitService} from "./product-unit/product-unit.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = {};
  productType: ProductType = new ProductType();
  productUnit: ProductUnit = new ProductUnit();
  types: ProductType[] = [];
  units: ProductUnit[] = [];

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private dialog: MatDialog,
              private productTypeService: ProductTypeService, private modalService: NgbModal,
              private productUnitService: ProductUnitService) {
    this.productTypeService.refreshEvent.subscribe(res => {
      this.getTypes();
    });
    this.productUnitService.refreshEvent.subscribe(res => {
      this.getUnits();
    });
  }

  ngOnInit() {
    this.getTypes();
    this.getUnits();
  }

  openType(){
    this.modalService.open(ProductTypeComponent);
  }

  openUnit(){
    this.modalService.open(ProductUnitComponent);
  }

  getUnits(){
      this.productUnitService.getAll().subscribe(units => {
        this.units = units;
        console.log(this.units);
      });
    }

  getTypes(){
      this.productTypeService.getAll().subscribe(types=>{
        this.types = types;
        console.log(this.types);});
    }

  insert(){
    this.productService.add(this.product).subscribe(data=>console.log(data));
  }
}

// addUnit(){
//   const dialogRef = this.dialog.open(DialogComponent, {width: '250px', data:
//       {unit: this.toBeAddedUnit, state:'addUnit'}});
//   dialogRef.afterClosed().subscribe(toBeAddedUnit=>{
//     this.toBeAddedUnit = toBeAddedUnit;
//     this.units.push({'unit':toBeAddedUnit});
//     console.log(this.units);
//   });
// }
