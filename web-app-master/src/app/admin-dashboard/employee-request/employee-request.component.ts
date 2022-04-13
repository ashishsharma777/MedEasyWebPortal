import {Component, OnInit} from '@angular/core';
import {RequisitionService} from "../../product/product-requisition/requisition.service";
import {EmployeeRequestActionComponent} from "../employee-request-action/employee-request-action.component";
import {Requisition} from "../../product/product-requisition/requisition";
import {ProductsComponent} from "../../stock-dashboard/products/products.component";

@Component({
  selector: 'app-admin',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css']
})
export class EmployeeRequestComponent implements OnInit {

  requisition: Requisition = new Requisition();
  requisitions: Requisition[] = [];

  constructor(private requisitionService: RequisitionService) {
    this.requisitionService.refreshEvent.subscribe(res=>{
      this.loadData();
    });
  }

  columnDefs = [
    {headerName: 'Id', field: 'id', filter: 'agNumberColumnFilter', width: 60},
    {headerName: 'Date', field: 'date', width: 160, resizable: true},
    {headerName: 'Employee Name', field: 'employeeName', filter: 'agTextColumnFilter', width: 150, resizable: true},
    {headerName: 'Designation', field: 'designation', filter: 'agTextColumnFilter', width: 150, resizable: true},
    {headerName: 'Products', field: 'products', cellRendererFramework: ProductsComponent, width: 150},
    {headerName: 'Department Name', field: 'departmentName', filter: 'agTextColumnFilter', width: 150, resizable: true},
    {headerName: 'Purpose', field: 'purpose', filter: 'agTextColumnFilter', width: 160, resizable: true},
    {
      headerName: "Action",
      cellRendererFramework: EmployeeRequestActionComponent,
      width: 190
    }
  ];
  rowData: any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.rowData = this.requisitionService.getByStatus("SENT").subscribe(res=>{
      this.requisitions = res;}
    );
  }
}
