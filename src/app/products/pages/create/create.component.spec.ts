import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

describe('CreateComponent', () => {

  const mockProductService = {
    createProduct: jest.fn().mockReturnValue(of({})), 
    verifyProduct: jest.fn().mockReturnValue(of(true))
  };

  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent, SnackbarComponent, ProductFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create product and show error message if ID already exists', (done) => {
    
    const mockProduct: Product = { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };
    mockProductService.verifyProduct.mockReturnValue(of(true)); 
    
    jest.spyOn(component.snackbar, 'showSnackbar');
  
    component.onCreate(mockProduct);
  
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      expect(mockProductService.createProduct).not.toHaveBeenCalledWith(mockProduct);
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith(`⚠️ ID "${mockProduct.id}" en uso. ⚠️`);
      done();
    });
  });
  
  it('should create product and show success message if ID not exists', (done) => {
  
    const mockProduct: Product = { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };
    mockProductService.verifyProduct.mockReturnValue(of(false)); 
    
    jest.spyOn(component.snackbar, 'showSnackbar');
  
    component.onCreate(mockProduct);
  
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith(`✅ Agregado con éxito. ✅`);
      done();
    });
  });

});
