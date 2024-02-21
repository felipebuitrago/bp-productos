import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{

  id : string | null = '';
  @ViewChild('snackbar') snackbar: SnackbarComponent = new SnackbarComponent();

  constructor( private productService : ProductService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    
    this.productService.verifyProduct(this.id)
      .subscribe(
        {
          next: e => {
            if(!e)this.router.navigate(['/productos'])
          },
          error: e => {
            this.snackbar.showSnackbar("❌ Hubo un error en la petición. ❌")
            
            setTimeout(() => {
              this.router.navigate(['/productos'])
            }, 1000);
          }
        }  
      );
  }

  onCreate($event: Product): void {
    
    this.productService.editProduct($event)
      .subscribe(
        {
          next: productUpdated => {
            this.snackbar.showSnackbar("✅ Editado con éxito. ✅");
            setTimeout(() => { this.router.navigate(['/productos']); }, 1000);
          },
          error: e => {
            this.snackbar.showSnackbar("❌ Hubo un error editando el producto. ❌")
          }
        }  
      )
  }
}