import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { switchMap, throwError } from 'rxjs';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  @ViewChild('snackbar') snackbar: SnackbarComponent = new SnackbarComponent();

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
          this.snackbar.showSnackbar("✅ Agregado con éxito. ✅");
        },
        error: (e) => {
          this.snackbar.showSnackbar(`⚠️ ID "${$event.id}" en uso. ⚠️`);
        }
      });
  }
}