import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {Demand} from "../product-demand/demand";
import {DemandService} from "../product-demand/demand.service";
import {ActivatedRoute} from "@angular/router";
import {ProductType} from "../product-type/product-type";
import {ProductTypeService} from "../product-type/product-type.service";
import {ProductUnit} from "../product-unit/product-unit";

@Component({
  selector: 'app-stock-request',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product = new Product();
  demand: Demand = new Demand();
  productType: ProductType = new ProductType();
  productUnit: ProductUnit = new ProductUnit();
  demands: Product[]= [];
  public gridApi;
  id: number;

  constructor(private demandService: DemandService, private router: ActivatedRoute) {
    this.demandService.refreshEvent.subscribe(res=>{
      this.loadData();
    });
  }

  columnDefs = [
    {headerName: 'ProductType', field: 'productType.type', width: 150},
    {headerName: 'ProductName', field: 'name', filter: 'agTextColumnFilter', width: 160},
    {headerName: 'Specification', field: '.specification', width: 200},
    {headerName: 'Unit', field: 'productUnit.unit', width: 150},
    {headerName: 'Quantity', field: 'quantity', width: 160}
  ];
  rowData: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.id = +this.router.snapshot.paramMap.get('id');
    this.rowData = this.demandService.getById(this.id).subscribe(res => {
      this.demands=res.products;
    });
  }

  onGridReady(param) {
    this.gridApi = param.api;
  }
}

