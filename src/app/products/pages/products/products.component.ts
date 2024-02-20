import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit{
  
  products : Product[] = [];

  constructor(private productService : ProductService) { }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
