import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private productService : ProductService) { }

  onCreate($event: Product): void {

    this.productService.verifyProduct($event.id)
      .pipe(
        switchMap((exists) => {
         
          if (!exists) {
            return this.productService.createProduct($event);
          
          } else {
            return throwError(() => new Error('id existente'));
          }
        })
      ).subscribe({
        next: () => {
          console.log("Producto creado");
        },
        error: (e) => {
          console.error(e);
        }
      });
  }
}