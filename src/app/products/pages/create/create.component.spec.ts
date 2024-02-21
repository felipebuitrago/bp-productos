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
    getProducts: jest.fn().mockReturnValue(of([])), // Asume que devuelve un array vacío para la prueba
    createProduct: jest.fn().mockReturnValue(of({})), // Asume que devuelve un objeto vacío o un producto simulado
    editProduct: jest.fn().mockReturnValue(of({})), // Similar a createProduct
    deleteProduct: jest.fn().mockReturnValue(of(true)), // Asume que la eliminación fue exitosa
    verifyProduct: jest.fn().mockReturnValue(of(true)) // Asume que la verificación fue exitosa
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
    const mockProduct: Product = { id: '1', name: 'Existing Product', date_release: new Date(), date_revision: new Date(), description: '', logo: '' };
    mockProductService.verifyProduct.mockReturnValue(of(true)); // Simula que el producto ya existe
    jest.spyOn(component.snackbar, 'showSnackbar');
  
    component.onCreate(mockProduct);
  
    fixture.detectChanges(); // Actualiza el estado del componente
  
    fixture.whenStable().then(() => {
      expect(mockProductService.createProduct).not.toHaveBeenCalledWith(mockProduct);
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith(`⚠️ ID "${mockProduct.id}" en uso. ⚠️`);
      done();
    });
  });

});
