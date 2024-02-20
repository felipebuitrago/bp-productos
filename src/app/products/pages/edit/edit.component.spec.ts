import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditComponent', () => {

  const mockProductService = {
    getProducts: jest.fn().mockReturnValue(of([])), // Asume que devuelve un array vacío para la prueba
    createProduct: jest.fn().mockReturnValue(of({})), // Asume que devuelve un objeto vacío o un producto simulado
    editProduct: jest.fn().mockReturnValue(of({})), // Similar a createProduct
    deleteProduct: jest.fn().mockReturnValue(of(true)), // Asume que la eliminación fue exitosa
    verifyProduct: jest.fn().mockReturnValue(of(true)) // Asume que la verificación fue exitosa
  };

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent, SnackbarComponent, ProductFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
