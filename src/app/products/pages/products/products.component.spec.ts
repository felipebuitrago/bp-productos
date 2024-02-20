import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  
  const mockProductService = {
    getProducts: jest.fn().mockReturnValue(of([])), // Asume que devuelve un array vacío para la prueba
    createProduct: jest.fn().mockReturnValue(of({})), // Asume que devuelve un objeto vacío o un producto simulado
    editProduct: jest.fn().mockReturnValue(of({})), // Similar a createProduct
    deleteProduct: jest.fn().mockReturnValue(of(true)), // Asume que la eliminación fue exitosa
    verifyProduct: jest.fn().mockReturnValue(of(true)) // Asume que la verificación fue exitosa
  };

  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductsTableComponent, FilterPipe, SnackbarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
