import { Component, OnInit } from '@angular/core';
import {Demand} from "../../product/product-demand/demand";
import {MatDialog} from "@angular/material";
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {DialogComponent} from "../../dialog/dialog.component";
import {DemandService} from "../../product/product-demand/demand.service";

@Component({
  selector: 'app-estock-action',
  templateUrl: './astock-action.component.html',
  styleUrls: ['./astock-action.component.css']
})
export class AstockActionComponent implements ICellRendererAngularComp {

  demand: Demand = new Demand();
  params: any;
  id: number;

  constructor(public dialog: MatDialog, private demandService: DemandService) { }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.demandService.getById(this.id).subscribe(
      res=> {
        this.demand = res;
      });
  }

  openReason() {
    this.dialog.open(DialogComponent, {
      data: {reason: (this.demand.reason?this.demand.reason:'No reason for denial'),
        state: 'displayReason'
      }
    });
  }

  refresh(): boolean {
    return false;
  }

}
