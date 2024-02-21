import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit{
  
  products : Product[] = [];
  @ViewChild('snackbar') snackbar : SnackbarComponent = new SnackbarComponent();

  constructor(private productService : ProductService) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      {
        next: products => {

          this.products = products;
        },
        error: () => {
          this.snackbar.showSnackbar("❌ Hubo un error leyendo los productos. ❌")
        }
      }
    );
  }
}
