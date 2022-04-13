import {Component, OnInit} from '@angular/core';
import {StockRequestActionComponent} from "../stock-request-action/stock-request-action.component";
import {DemandService} from "../../product/product-demand/demand.service";
import {Demand} from "../../product/product-demand/demand";
import {ProductRequestComponent} from "../product-request/product-request.component";

@Component({
  selector: 'app-stock-request',
  templateUrl: './stock-request.component.html',
  styleUrls: ['./stock-request.component.css']
})
export class StockRequestComponent implements OnInit {

  demand: Demand =  new Demand();

  demands: Demand[] = [];

  public gridApi;

  constructor(private demandService: DemandService) {
    this.demandService.refreshEvent.subscribe(res=>{
      this.loadData();
    });
  }

  columnDefs = [
    {headerName: 'Id', field: 'id', filter: 'agNumberColumnFilter', width: 60},
    {headerName: 'Date', field: 'date', width: 150, resizable: true},
    {headerName: 'StockUser', field: 'stockUserName', filter: 'agTextColumnFilter', width: 160, resizable: true},
    {headerName: 'Products', field: 'products', cellRendererFramework: ProductRequestComponent, width: 150},
    {
      headerName: "Action",
      cellRendererFramework: StockRequestActionComponent,
      width: 190
    },
    {headerName: 'Status', field: 'status', filter: 'agTextColumnFilter', width: 160, resizable: true}
  ];
  rowData: any;

  ngOnInit() {
    this.loadData();
  }

  loadData(): void{
    this.rowData = this.demandService.getAll().subscribe(res=> {
      this.demands = res;
    });
  }

  onGridReady(param) {
    this.gridApi = param.api;
  }
}
