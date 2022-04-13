import { Component } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {DialogComponent} from "../../dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {Requisition} from "../../product/product-requisition/requisition";
import {RequisitionService} from "../../product/product-requisition/requisition.service";
import {ProductTypeService} from "../../product/product-type/product-type.service";
import {ProductType} from "../../product/product-type/product-type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements ICellRendererAngularComp {

  public params: any;

  public id: number;

  requisition: Requisition = new Requisition();

  productType: ProductType = new ProductType();

  constructor(public dialog: MatDialog, private requisitionService: RequisitionService,
              private productTypeService: ProductTypeService) { }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.productTypeService.getById(this.id).subscribe(res=> this.productType = res);
    this.requisitionService.getById(this.id).subscribe(
      res=> {
        this.requisition = res;
      });
  }

  view(){
    this.dialog.open(DialogComponent, {width: '500px', data:{
        requisitions: this.requisition.products, state: 'displayProduct'},
    });
  }

  refresh(): boolean {
    return false;
  }
}
