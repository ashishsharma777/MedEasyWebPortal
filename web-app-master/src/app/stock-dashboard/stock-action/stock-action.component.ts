import {Component, Inject} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {Requisition} from "../../product/product-requisition/requisition";
import {RequisitionService} from "../../product/product-requisition/requisition.service";
import {Location} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-admin-action',
  templateUrl: './stock-action.component.html',
  styleUrls: ['./stock-action.component.css']
})
export class StockActionComponent implements ICellRendererAngularComp {

  public params: any;

  public id: number;

  requisition: Requisition = new Requisition();

  constructor(private requisitionService: RequisitionService, private location: Location,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.requisitionService.getById(this.id).subscribe(
      res=> {
        this.requisition = res;
        console.log(res);
      });
  }

  refresh(): boolean {
    return false;
  }

  forward() {
    this.requisitionService.getById(this.id).subscribe(
      requisition => {
        this.requisition = requisition;
        this.requisition.status = "SENT";
        this.requisitionService.update(this.requisition).subscribe(requisition=> {
          this.requisitionService.refreshEvent.emit();});
        this.snackBar.open('Request Forwarded', '', {duration: 2000});
      });
  }

  openReason() {
        this.dialog.open(DialogComponent, {
          data: {reason: (this.requisition.reason?this.requisition.reason:'No reason for denial'),
            state: 'displayReason'
          }
        });
  }
}
