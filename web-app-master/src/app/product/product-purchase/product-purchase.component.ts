import { Component, OnInit } from '@angular/core';
import {PurchaseService} from './purchase.service';
import {MatDialog, MatSnackBar} from "@angular/material";
import {Purchase} from "./purchase";
import {GridApi, ColumnApi} from 'ag-grid-community';
import {Demand} from "../product-demand/demand";
import {DemandService} from "../product-demand/demand.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../product";
import {ProductTypeService} from "../product-type/product-type.service";
import {ProductUnitService} from "../product-unit/product-unit.service";

@Component({
  selector: 'app-product-purchase-form',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css']
})
export class ProductPurchaseComponent implements OnInit {

  purchase: Purchase = new Purchase();
  demand: Demand = new Demand();
  demands: Demand[] = [];
  product: Product = new Product();private api: GridApi;
  private columnApi: ColumnApi;
  rowData: any;

  constructor(private purchaseService: PurchaseService, private route:ActivatedRoute,
              private demandService: DemandService, public dialog: MatDialog, private snackBar: MatSnackBar,
              private productTypeService: ProductTypeService, private productUnitService: ProductUnitService) {
  }

  columnDefs = [
    {headerName: 'Product Type', field: 'productType.type', width: 200},
    {headerName: 'Product Name', field: 'name', width: 200},
    {headerName: 'Specification', field: 'specification', width: 200},
    {headerName: 'Unit', field: 'productUnit.unit', width: 150},
    {headerName: 'Quantity', field: 'quantity', width: 150},
  ];

  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    const id= +this.route.snapshot.paramMap.get('id');
    this.demandService.getById(id).subscribe(res=> {
      this.demand =res;
      this.rowData = this.demand.products;
    });
  }

  insert(): void {
    this.purchase.products = this.demand.products;
    this.purchaseService.add(this.purchase).subscribe(data => console.log(data));
    this.snackBar.open('Forwarded To Vendor', '', {duration: 3000});
  }
}
