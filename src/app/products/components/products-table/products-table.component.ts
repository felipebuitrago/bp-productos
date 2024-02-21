import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @ViewChild('dialog') dialog: ElementRef = new ElementRef('dialog');
  @ViewChild('snackbar') snackbar : SnackbarComponent = new SnackbarComponent();

  @Input() products : Product[] = [];
  @Output() onProductDelete = new EventEmitter<boolean>();

  search : string = '';
  page : number = 0;
  recordsPerPage : number = 5;
  productToDelete : Product = { name: '' , id: '', date_release: new Date(), date_revision: new Date(), description: '', logo: ''};

  constructor(private productService : ProductService, private router : Router) { }
  
  editProduct(product: Product): void {
    this.router.navigate(['productos/editar', product.id]);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productToDelete.id)
      .subscribe(
        {
          next: e =>{
            this.onProductDelete.emit(true);
            this.dialog.nativeElement.close();
            this.page = 0;
            this.snackbar.showSnackbar('✅ Eliminado con éxito. ✅');
          },
          error: e => {
            this.dialog.nativeElement.close();
            this.snackbar.showSnackbar('❌ Error eliminando el producto. ❌');
          }
        }
      );
  }

  onSearch(search: string) {
    this.page = 0;
    this.search = search;
  }

  onRecordsPerPageChange(records: any){
    this.recordsPerPage = Number(records.target.value);
    this.page = 0;
  }

  onPrevPage(){
    if (this.page > 0) 
      this.page -= 1; 
  }
  
  onNextPage(){
    this.page += 1; 
  }

  openDialog(product: Product) {
    this.productToDelete = product;
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
