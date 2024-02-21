import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsTableComponent } from './products-table.component';
import { ProductService } from '../../services/product.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SnackbarComponent } from '../snackbar/snackbar.component';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent, FilterPipe, SnackbarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: ProductService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update search term and reset page number on search', () => {
    component.onSearch('test');
    expect(component.search).toBe('test');
    expect(component.page).toBe(0);
  });

  it('should update records per page and reset page number on records change', () => {
    const mockEvent = { target: { value: '10' } }; // Simula el evento de cambio
    component.onRecordsPerPageChange(mockEvent);
    expect(component.recordsPerPage).toBe(10);
    expect(component.page).toBe(0);
  });

  it('should increment page number on next page', () => {
    component.page = 0; // Establecer página actual
    component.onNextPage();
    expect(component.page).toBe(1);
  });
  
  it('should decrement page number on previous page', () => {
    component.page = 1; // Establecer página actual
    component.onPrevPage();
    expect(component.page).toBe(0);
  });
  
});
