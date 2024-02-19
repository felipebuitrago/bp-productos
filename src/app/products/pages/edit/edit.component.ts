import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  id : string | null = '';
  formattedDate = `${year}-${month}-${day}`;
  date_revision : string = '';

  productForm : FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
    }
  )

  constructor( private productService : ProductService, private route: ActivatedRoute, private router: Router , private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    
    this.productService.verifyProduct(this.id).subscribe(exists => {
      if(!exists)this.router.navigate(['/productos'])
    });

  }

  onCreate(): void {
    this.productService.editProduct(
      { 
        id: this.id, 
        date_revision: this.date_revision, 
        ...this.productForm.value
      }
    )
    .subscribe(
      () => {
        this.onReset();
      }
    )
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
      name: '',
      description: '',
      logo: '',
      date_release: '',
    });
    this.date_revision = '';
  }
}

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');