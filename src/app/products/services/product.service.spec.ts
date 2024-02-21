import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product.interface';
import { HttpClientModule } from '@angular/common/http';

const mockSimpleProduct: Product = { id: '333', name: 'Tarjeta Debito', date_release: '2024-06-06T05:00:00.000+00:00', date_revision: '2024-06-06T05:00:00.000+00:00', description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };

describe('ProductService', () => {
  
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test getProducts debe retornar todos los productos
  it('should return a list of products', (done) => {
    
    service.getProducts().subscribe( products => {
        expect( products ).toBeInstanceOf(Array<Product[]>);
        console.log("Productos consultados");
        done();
      })
  });

  // Test createProduct debe crear el producto y retornarlo
  it('should create a new product and return it', (done) => {
    
    service.createProduct(mockSimpleProduct).subscribe(product => {
      console.log(product);
      expect(product).toEqual(mockSimpleProduct);
      console.log("Producto sample creado");
      done();
    });
  });

  // Test editProduct debe actualizar el producto y retornarlo
  it('should update the product and return it', (done) => {
    
    service.editProduct(mockSimpleProduct).subscribe(product => {
      expect(product).toEqual(mockSimpleProduct);
      console.log("Producto sample editado");
      done();
    });
  });

  // Test verifyProduct debe retornar true si el id del esta en uso
  it('should return product verification result', (done) => {

    service.verifyProduct(mockSimpleProduct.id).subscribe(result => {
      expect(result).toBeTruthy();
      console.log("Producto sample verificado");
      done();
    });
  });

  // Test deleteProduct debe eliminar el producto y retornar true
  it('should remove the product and return true', (done) => {

    service.deleteProduct(mockSimpleProduct.id).subscribe(result => {
      expect(result).toBeTruthy();
      console.log("Producto sample eliminado");
      done();
    });
  });

});