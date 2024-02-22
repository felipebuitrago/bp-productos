import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { getNextYearFormattedDate } from '../../helpers/dates.helpers';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent, FilterPipe],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: ProductService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update date_revision when date_release changes', () => {

    const testDate = '2023-01-01'; // fecha de prueba
    component.onDateChange({target: {value: testDate}});
    expect(component.date_revision).toBe(getNextYearFormattedDate(testDate));

    console.log("✅ ProductFormComponent should update date_revision when date_release changes ✅");

  });

  it('should reset the form when onReset is called', () => {

    component.onReset();
    expect(component.productForm.value).toEqual({
      id: '', 
      name: '',
      description: '',
      logo: '',
      date_release: ''
    });
    expect(component.date_revision).toBe('');

    console.log("✅ ProductFormComponent should reset the form when onReset is called ✅");
  });
});
