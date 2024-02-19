import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @ViewChild('dialog') dialog: ElementRef = new ElementRef('dialog');
  @Input() products : Product[] = [];
  @Output() onProductDelete = new EventEmitter<boolean>()

  productToDelete: Product = { name: '' , id: '', date_release: new Date(), date_revision: new Date(), description: '', logo: ''};

  constructor(private productService : ProductService, private router : Router) { }
  
  editProduct(product: Product): void {
    this.router.navigate(['productos/editar', product.id]);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productToDelete.id).subscribe(  
      () => {
        this.onProductDelete.emit(true);
        this.dialog.nativeElement.close();
      }
    );
  }

  openDialog(product: Product) {
    this.productToDelete = product;
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
