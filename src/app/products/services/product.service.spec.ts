import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product.interface';
import { HttpClientModule } from '@angular/common/http';

const mockProduct: Product = { id: '333', name: 'Tarjeta Debito', date_release: '2024-06-06T05:00:00.000+00:00', date_revision: '2024-06-06T05:00:00.000+00:00', description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };

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

  it('should return the list of products', (done) => {
    
    service.getProducts().subscribe( products => {
        expect( products ).toBeInstanceOf(Array<Product[]>);
        console.log("✅ ProductService should return the list of products ✅");
        done();
      })
  });

  it('should create a new product and return it', (done) => {
    
    service.createProduct(mockProduct).subscribe(product => {
  
      expect(product).toEqual(mockProduct);
      console.log("✅ ProductService should create a new product and return it ✅");
      done();
    });
  });

  it('should update the product and return it', (done) => {
    
    service.editProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
      console.log("✅ ProductService should update the product and return it ✅");
      done();
    });
  });

  it('should return product verification result', (done) => {

    service.verifyProduct(mockProduct.id).subscribe(result => {
      expect(result).toBeTruthy();
      console.log("✅ ProductService should return product verification result ✅");
      done();
    });
  });

  it('should remove the product and return true', (done) => {

    service.deleteProduct(mockProduct.id).subscribe(result => {
      expect(result).toBeTruthy();
      console.log("✅ ProductService should remove the product and return true ✅");
      done();
    });
  });

});