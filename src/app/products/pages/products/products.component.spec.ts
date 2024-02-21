import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

describe('ProductsComponent', () => {

  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const mockProductService = {
    getProducts: jest.fn().mockReturnValue(of([
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
    ])), 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductsTableComponent, FilterPipe, SnackbarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();    
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {

    const mockProducts: Product[] = [
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
      { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
    ];
    mockProductService.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit(); 
    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

});
