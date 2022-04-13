import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent} from "./stock-dashboard/stock-list/stock-list.component";
import {ProductRequisitionComponent} from "./product/product-requisition/product-requisition.component";
import {StockActionComponent} from "./stock-dashboard/stock-action/stock-action.component";
import {EmployeeRequestComponent} from "./admin-dashboard/employee-request/employee-request.component";
import {ProductDemandComponent} from "./product/product-demand/product-demand.component";
import {ProductPurchaseComponent} from "./product/product-purchase/product-purchase.component";
import {ProductComponent} from "./product/product.component";
import {StockRequestComponent} from "./admin-dashboard/stock-request/stock-request.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AstockComponent} from "./stock-dashboard/astock/astock.component";
import {StockDashboardComponent} from "./stock-dashboard/stock-dashboard.component";
import {ProductTypeComponent} from "./product/product-type/product-type.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductUnitComponent} from "./product/product-unit/product-unit.component";

const routes: Routes = [
  { path: 'requisition', component: ProductRequisitionComponent },
  { path: 'demand', component: ProductDemandComponent },
  { path: 'purchase/:id', component: ProductPurchaseComponent },
  { path: 'stock', component: StockDashboardComponent},
  { path: 'forward', component: StockActionComponent},
  { path: 'employee-request', component: EmployeeRequestComponent},
  { path: 'product', component: ProductComponent},
  { path: 'stock-request', component: StockRequestComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'aStock', component: AstockComponent},
  { path: 'eStock', component: StockListComponent },
  { path: 'product-list/demand/:id', component: ProductListComponent},
  { path: 'product-type', component: ProductTypeComponent, outlet: 'productTypePopup'},
  { path: 'product-unit', component: ProductUnitComponent, outlet: 'productUnitPopup'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
