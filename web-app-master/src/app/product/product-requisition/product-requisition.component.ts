import {Component, OnInit} from '@angular/core';
import {RequisitionService} from './requisition.service';
import {GridApi, ColumnApi} from 'ag-grid-community';
import {MatDialog, MatSnackBar} from "@angular/material";
import {Requisition} from "./requisition";
import {Product} from "../product";
import {ProductTypeService} from "../product-type/product-type.service";
import {ProductUnitService} from "../product-unit/product-unit.service";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-requisition-form',
  templateUrl: './product-requisition.component.html',
  styleUrls: ['./product-requisition.component.css']
})
export class ProductRequisitionComponent implements OnInit {

  requisition: Requisition= new Requisition();
  product: Product = new Product();
  private api: GridApi;
  private columnApi: ColumnApi;
  types = [];
  productTypes: any;
  productNames: any;
  productUnits: any;
  displaySelectedNames = [];
  displaySelectedTypes = [];
  displaySelectedUnits = [];
  addedProduct: Product[] = [];
  toBeAddedProduct: Product = {};
  rowData = [];

  constructor(private requisitionService: RequisitionService, private dialog: MatDialog, private snackBar: MatSnackBar,
              private productTypeService: ProductTypeService, private productUnitService: ProductUnitService,
              private productService: ProductService) {}

  columnDefs = [
    {
      headerName: 'Product Type', field: 'productType', width: 200, editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {values: this.displaySelectedTypes},
    },
    {
      headerName: 'Product Name', field: 'name', width: 200, editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {values: this.displaySelectedNames},
    },

    {headerName: 'Specification', field: 'specification', width: 200, editable: false,},
    {
      headerName: 'Unit', field: 'productUnit', width: 150, editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {values: this.displaySelectedUnits},
    },
    {headerName: 'Quantity', field: 'quantity', width: 150, editable: true},
  ];

  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  addRow() {
    this.rowData.push({
      'productType': 'choose',
      'name': 'choose',
      'specification': null,
      'unit': null,
      'quantity': null,
    });
    this.api.setRowData(this.rowData);
  }

  ngOnInit() {
    this.getTypes();
    this.getNames();
    this.getUnits();
  }

  getTypes() {
    this.productTypeService.getAll().subscribe(res => {
      this.productTypes = res;
      this.types = res.map(data => ({
        id: data.id,
        type: data.type
      }));
      for (let type of this.productTypes) {
        this.displaySelectedTypes.push(type.type);
      }
    });
  }

  getNames() {
    this.productService.getAll().subscribe(res => {
      this.productNames = res.map(data => ({
        id: data.id,
        product_type_id: data.productType.id,
        product_unit_id: data.productUnit.id,
        name: data.name,
      }));
    });
  }

  getUnits() {
    this.productUnitService.getAll().subscribe(res => {
      this.productUnits = res.map(data => ({
        id: data.id,
        unit: data.unit,
      }));
    });
  }

  getProductTypeId(params) {
    for (let type of this.productTypes) {
      if (params == type.type) {
        return type.id;
      }
    }
    return 0;
  }

  getProductUnitId(params) {
    for (let unit of this.productUnits) {
      if (params == unit.unit) {
        return unit.id;
      }
    }
    return 0;
  }

  onChange(event): void {
    this.api = event.api;
    let productType = this.productTypes.find(data => data.type == event.data.productType);
    let productNames = this.productNames.filter(data => {
      return data.product_type_id == productType.id;
    });
    console.log(productNames);
    //this.displaySelectedNames = productNames.map(data => data.name);
    for(let productName of productNames){
      this.displaySelectedNames.push(productName.name);
    }
    this.api.setRowData(this.rowData);
  }

  insert(): void {
    this.requisition.products = [];
    this.api.forEachNode((node) => {
      const {data} = node;
      this.requisition.products.push({
        'productType': {'id': this.getProductTypeId(data.productType)},
        'name': data.name,
        'specification': data.specification,
        'productUnit': {'id': this.getProductUnitId(data.productUnit)},
        'quantity': data.quantity,
      });
    });
    this.requisitionService.add(this.requisition).subscribe(data => console.log(data));
    this.snackBar.open('Form Forwarded for Verification', '', {duration: 3000});
  }
}

// add() {
//   const dialogRef = this.dialog.open(DialogComponent, {width: '350px',
//     data: {toBeAddedProduct: this.toBeAddedProduct, state:'addProducts'}});
//   dialogRef.afterClosed().subscribe(result => {
//     this.toBeAddedProduct = result;
//     this.addedProduct.push(result);
//   });
// }
