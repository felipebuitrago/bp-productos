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

  it('should redirect if product does not exist', (done) => {
    mockProductService.verifyProduct.mockReturnValue(of(false)); // Simula que el producto no existe
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true)); // Mock de la redirección
  
    component.ngOnInit(); // Llama a ngOnInit para simular la inicialización
  
    setTimeout(() => { // Espera a que se resuelvan las promesas internas
      expect(router.navigate).toHaveBeenCalledWith(['/productos']);
      done();
    }, 0);
  });
  
  it('should call editProduct and show success message on successful edit', (done) => {
    const mockProduct: Product = { id: '123', name: 'Test', date_release: new Date(), date_revision: new Date(), description: '', logo: '' };
    mockProductService.editProduct.mockReturnValue(of(mockProduct)); // Simula la edición exitosa
    jest.spyOn(component.snackbar, 'showSnackbar');
  
    component.onCreate(mockProduct);
  
    fixture.detectChanges(); // Actualiza el estado del componente
  
    fixture.whenStable().then(() => {
      expect(mockProductService.editProduct).toHaveBeenCalledWith(mockProduct);
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith("✅ Editado con éxito. ✅");
      done();
    });
  });
  
  it('should have null id initially', () => {
    expect(component.id).toBeNull();
  });
});
