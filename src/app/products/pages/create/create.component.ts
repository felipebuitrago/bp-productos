import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { getFormattedDate, getNextYearFormattedDate } from '../../helpers/dates.helpers';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  date_revision : string = '';
  formattedDate = getFormattedDate();
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
    
    this.date_revision = getNextYearFormattedDate($event.target.value);
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