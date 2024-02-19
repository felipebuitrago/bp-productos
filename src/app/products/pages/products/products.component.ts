import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  
  products : Product[] = [];

  constructor(private productService : ProductService, private router : Router) { }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  editProduct(product: Product): void {
    this.router.navigate(['productos/editar', product.id]);
  }

  deleteProduct(product: any): void {
    console.log(product);
  }

}
