import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  date_revision : string = '';
  formattedDate = `${year}-${month}-${day}`;
  productForm : FormGroup = this.fb.group(
    {
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
    }
  )

  constructor(private fb: FormBuilder, private productService : ProductService) { }

  onCreate(): void {

    this.productService.createProduct(
      {
        date_revision : this.date_revision,
        ...this.productForm.value
      }
    ).subscribe(
      () => {
        this.onReset();
      }
    );
  }

  onDateChange($event: any): void {

    var selectedDateTime = new Date($event.target.value).getTime();
    var milliseconsInYear = (366 * 24 * 60 * 60 * 1000 );
    var nextYearDate = new Date(selectedDateTime + milliseconsInYear);
    
    var month = String(nextYearDate.getMonth() + 1).padStart(2, '0');
    var day = String(nextYearDate.getDate()).padStart(2, '0');

    this.date_revision = `${nextYearDate.getFullYear()}-${month}-${day}`;
  }

  onReset(): void {
    this.productForm.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
    })
    this.date_revision = '';
  }
}

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
