import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getFormattedDate, getNextYearFormattedDate } from '../../helpers/dates.helpers';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  @Input() formTitle : string = '';
  @Input() id : string | null = '';
  @Output() onSubmitEvent = new EventEmitter<Product>();

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm.controls['id'].setValue(this.id)
  }

  onSubmit(): void {

    this.onSubmitEvent.emit({ date_revision: this.date_revision , ...this.productForm.value});
    this.onReset();
  }

  onDateChange($event: any): void {
    
    this.date_revision = getNextYearFormattedDate($event.target.value);
  }

  onReset(): void {
    this.productForm.reset({
      id: (this.id)? this.id : '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
    })
    this.date_revision = '';
  }

  isValidField( field: string ): boolean | null {
    return this.productForm.controls[field].errors
      && this.productForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.productForm.controls[field] ) return null;

    const errors = this.productForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido!';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        
        case 'maxlength':
          return `Máximo ${ errors['maxlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }
}