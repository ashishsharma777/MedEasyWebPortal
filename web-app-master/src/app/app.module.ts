import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductRequisitionComponent } from './product/product-requisition/product-requisition.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StockListComponent } from './stock-dashboard/stock-list/stock-list.component';
import { EmployeeRequestComponent } from './admin-dashboard/employee-request/employee-request.component';
import {HttpClientModule} from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeRequestActionComponent } from './admin-dashboard/employee-request-action/employee-request-action.component';
import { DialogComponent } from './dialog/dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {StockActionComponent} from "./stock-dashboard/stock-action/stock-action.component";
import {ProductDemandComponent} from "./product/product-demand/product-demand.component";
import {ProductPurchaseComponent} from "./product/product-purchase/product-purchase.component";
import {ProductComponent} from "./product/product.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {StockRequestComponent} from "./admin-dashboard/stock-request/stock-request.component";
import {StockRequestActionComponent} from "./admin-dashboard/stock-request-action/stock-request-action.component";
import {ProductRequestComponent} from "./admin-dashboard/product-request/product-request.component";
import {AstockActionComponent} from "./stock-dashboard/astock-action/astock-action.component";
import {AstockComponent} from "./stock-dashboard/astock/astock.component"
import {StockDashboardComponent} from "./stock-dashboard/stock-dashboard.component";
import {ProductsComponent} from "./stock-dashboard/products/products.component";
import {ProductTypeComponent} from "./product/product-type/product-type.component";
import {CommonModule} from "@angular/common";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductUnitComponent} from "./product/product-unit/product-unit.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductRequisitionComponent,
    StockListComponent,
    EmployeeRequestComponent,
    StockActionComponent,
    EmployeeRequestActionComponent,
    DialogComponent,
    ProductDemandComponent,
    ProductPurchaseComponent,
    StockRequestActionComponent,
    AdminDashboardComponent,
    StockRequestComponent,
    ProductRequestComponent,
    AstockActionComponent,
    AstockComponent,
    StockDashboardComponent,
    ProductsComponent,
    ProductTypeComponent,
    ProductListComponent,
    ProductUnitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([EmployeeRequestActionComponent, StockActionComponent,
    StockRequestComponent, ProductRequestComponent, AstockActionComponent, AstockComponent, ProductsComponent]),
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports:[
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    EmployeeRequestActionComponent,
    StockRequestActionComponent,
    AstockActionComponent,
    DialogComponent,
    ProductRequestComponent,
    ProductsComponent,
    ProductTypeComponent,
    ProductUnitComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
