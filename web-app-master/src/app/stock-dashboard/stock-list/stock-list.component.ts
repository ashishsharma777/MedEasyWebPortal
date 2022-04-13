import { Component, OnInit } from '@angular/core';
import {StockActionComponent} from "../stock-action/stock-action.component";
import {RequisitionService} from "../../product/product-requisition/requisition.service";
import {Requisition} from "../../product/product-requisition/requisition";
import {ProductsComponent} from "../products/products.component";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  requisition: Requisition = new Requisition();
  requisitions: Requisition[] = [];

  public gridApi;

  constructor(private requisitionService: RequisitionService) {
    this.requisitionService.refreshEvent.subscribe(res => {
      this.loadData();
    });
  }

  columnDefs = [
    {headerName: 'Id', field: 'id', filter: 'agNumberColumnFilter', width: 60},
    {headerName: 'Date', field: 'date', width: 150, resizable: true},
    {headerName: 'Employee Name', field: 'employeeName', filter: 'agTextColumnFilter', width: 140, resizable: true},
    {headerName: 'Designation', field: 'designation', filter: 'agTextColumnFilter', width: 130, resizable: true},
    {headerName: 'Products', field: 'products', cellRendererFramework: ProductsComponent, width: 140},
    {headerName: 'Department Name', field: 'departmentName', filter: 'agTextColumnFilter', width: 160, resizable: true},
    {headerName: 'Purpose', field: 'purpose', filter: 'agTextColumnFilter', width: 150, resizable: true},
    {
      headerName: "Action",
      cellRendererFramework: StockActionComponent,
      width: 190
    },
    {headerName: 'Status', field: 'status', width: 110},
  ];
  rowData: any;

  loadData() {
    this.rowData = this.requisitionService.getAll().subscribe(res=> this.requisitions = res);
  }

  ngOnInit() {
    this.loadData();
  }

  onGridReady(param) {
    this.gridApi = param.api;
  }
}
