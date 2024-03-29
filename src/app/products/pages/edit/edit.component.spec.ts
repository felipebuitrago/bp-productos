import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

describe('EditComponent', () => {

  const mockProductService = {
    editProduct: jest.fn().mockReturnValue(of({})),
    verifyProduct: jest.fn().mockReturnValue(of(true))
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

  it('should redirect if product does not exist', (done) => {

    mockProductService.verifyProduct.mockReturnValue(of(false));

    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
  
    component.ngOnInit(); 
  
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/productos']);
      done();
    }, 0);

    console.log("✅ EditComponent should redirect if product does not exist ✅");
  });
  
  it('should call editProduct and show success message on successful edit', (done) => {
    
    const mockProduct: Product = { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };
    
    mockProductService.editProduct.mockReturnValue(of(mockProduct));
    jest.spyOn(component.snackbar, 'showSnackbar');
  
    component.onCreate(mockProduct);
  
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      expect(mockProductService.editProduct).toHaveBeenCalledWith(mockProduct);
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith("✅ Editado con éxito. ✅");
      done();
    });

    console.log("✅ EditComponent should call editProduct and show success message on successful edit ✅");
  });
  
});
