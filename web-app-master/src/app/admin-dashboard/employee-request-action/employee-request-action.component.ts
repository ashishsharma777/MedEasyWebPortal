import {Component, Input, OnInit} from '@angular/core';
import {Requisition} from "../../product/product-requisition/requisition";
import {RequisitionService} from "../../product/product-requisition/requisition.service";
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from "../../dialog/dialog.component";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-stock-action',
  templateUrl: './employee-request-action.component.html',
  styleUrls: ['./employee-request-action.component.css']
})
export class EmployeeRequestActionComponent implements ICellRendererAngularComp {

  public params: any;
  public id: number;
  reason: string;
  requisition: Requisition = new Requisition();

  constructor(private requisitionService: RequisitionService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.requisitionService.getById(this.id).subscribe(
      res => {
        this.requisition = res;
      });
  }

  approve(): void {
    this.requisitionService.getById(this.id).subscribe(
      requisition => {
        this.requisition = requisition;
        this.requisition.status = "Access Granted";
        this.requisitionService.update(this.requisition).subscribe(requisition => {
          this.requisitionService.refreshEvent.emit();
        })
        this.snackBar.open('Request Approved', '', {duration: 2000});
      });
  }

  deny(): void {
    console.log(this.id);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {reason: this.reason, state:'writeReason'}
    }
    );
    dialogRef.afterClosed().subscribe(reason => {
      this.reason = reason;
      this.requisitionService.getById(this.id).subscribe(res => {
        this.requisition = res;
        this.requisition.status = "Access Denied";
        this.requisition.reason = this.reason;
        this.requisitionService.update(this.requisition).subscribe(requisition=>{
          this.requisitionService.refreshEvent.emit();
        });
      });
      console.log(this.reason);
      this.snackBar.open('Request Denied', '', {duration: 2000});
    });
  }

  refresh(): boolean {
    return false;
  }
}
