import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {DialogComponent} from "../../dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {Demand} from "../../product/product-demand/demand";
import {DemandService} from "../../product/product-demand/demand.service";
import {ProductTypeService} from "../../product/product-type/product-type.service";
import {ProductType} from "../../product/product-type/product-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.css']
})
export class ProductRequestComponent implements ICellRendererAngularComp {

  public params: any;

  public id: number;

  type: string;

  demand: Demand = new Demand();

  productType: ProductType = new ProductType();

  constructor(public dialog: MatDialog, private demandService: DemandService,
              private productTypeService: ProductTypeService, private router: Router) { }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.productTypeService.getById(this.id).subscribe(res=> {
      this.productType = res;
      this.type=this.productType.type;
    });
    this.demandService.getById(this.id).subscribe(
      res=> {
        this.demand = res;
      });
  }


  view(){
    this.router.navigate(['/product-list/demand', this.id])
    // this.dialog.open(DialogComponent, {width: '600px', data:{
    //   demands: this.demand.products, state: 'displayProducts'},
    // });
  }

  refresh(): boolean {
    return false;
  }

}
