import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {DemandService} from "../../product/product-demand/demand.service";
import {Demand} from "../../product/product-demand/demand";
import {MatDialog, MatSnackBar} from "@angular/material";
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-stock-request-action',
  templateUrl: './stock-request-action.component.html',
  styleUrls: ['./stock-request-action.component.css']
})
export class StockRequestActionComponent implements ICellRendererAngularComp {

  public params: any;
  public id: number;
  reason: string;
  demand: Demand = new Demand();

  constructor(private demandService: DemandService, private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  agInit(params: any): void {
    this.params = params;
    this.id = params.valueOf().data.id;
    this.demandService.getById(this.id).subscribe(
      res => {
        this.demand = res;
      });
  }

  accept() {
    this.demandService.getById(this.id).subscribe(
      demand => {
        this.demand = demand;
        this.demand.status = "ACCEPT";
        this.demandService.update(this.demand).subscribe(demand => {
          this.demandService.refreshEvent.emit();
        });
        this.snackBar.open('Request Approved', '', {duration: 2000});
      });
  }

  deny() {
    console.log(this.id);
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        data: {reason: this.reason, state: 'writeReason'}
      }
    );
    dialogRef.afterClosed().subscribe(reason => {
      this.reason = reason;
      this.demandService.getById(this.id).subscribe(demand => {
        this.demand = demand;
        this.demand.status = "DENY";
        this.demand.reason = this.reason;
        this.demandService.update(this.demand).subscribe(demand => {
          this.demandService.refreshEvent.emit();
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
