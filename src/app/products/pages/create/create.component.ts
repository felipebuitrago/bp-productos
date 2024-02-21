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
            //guardamos fecha con sistema horario UTC -5 para que el pipe Date funcione correctamente
            $event.date_release = new Date($event.date_release + 'T00:00:00.000-05:00');
            $event.date_revision = new Date($event.date_revision + 'T00:00:00.000-05:00');
            return this.productService.createProduct($event);
          
          } else {
            return throwError(() => new Error('id existente'));
          }
        })
      ).subscribe({
        next: productCreated => {
          this.snackbar.showSnackbar("✅ Agregado con éxito. ✅");
        },
        error: e => {
          var snackbarMessage = (e.message == 'bad request') ? '❌ Hubo un error creando el producto ❌' : `⚠️ ID "${$event.id}" en uso. ⚠️`;
          this.snackbar.showSnackbar(snackbarMessage);
        }
      });
  }
}