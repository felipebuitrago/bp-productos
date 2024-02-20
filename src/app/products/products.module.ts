import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ProductsComponent,
    EditComponent,
    CreateComponent,
    ProductsTableComponent,
    FilterPipe,
    ProductFormComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
