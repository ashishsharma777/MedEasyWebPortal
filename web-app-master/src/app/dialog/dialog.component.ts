import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Demand} from "../product/product-demand/demand";
import {Product} from "../product/product";
import {Requisition} from "../product/product-requisition/requisition";
import {Purchase} from "../product/product-purchase/purchase";
import {ProductType} from "../product/product-type/product-type";
import {ProductTypeService} from "../product/product-type/product-type.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  demand: Demand = new Demand();

  product: Product = new Product();

  productType:  ProductType = new ProductType();

  requisition: Requisition = new Requisition();

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private productTypeService: ProductTypeService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insert(): void{
    this.productTypeService.add(this.productType).subscribe();
  }

  ngOnInit() {
  }
}
