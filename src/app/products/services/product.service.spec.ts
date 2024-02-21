import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../interfaces/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test getProducts debe retornar una lista de productos
  it('should return a list of products', () => {

    const mockProducts: Product[] = [
      { name: 'Test Product 1', id: '1', date_release: new Date(), date_revision: new Date(), description: '', logo: '' },
      { name: 'Test Product 2', id: '2', date_release: new Date(), date_revision:  new Date(), description: '', logo: '' }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.baseURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  // Test createProduct debe crear el producto y retornarlo
  it('should add a new product and return it', () => {
    
    const newProduct: Product = { name: 'New Product', id: '3', date_release: new Date(), date_revision: new Date(), description: '', logo: '' };

    service.createProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(service.baseURL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  // Test editProduct debe actualizar el producto y retornarlo
  it('should update the product and return it', () => {

    const updatedProduct: Product = { name: 'Updated Product', id: '3', date_release: new Date(), date_revision: new Date(), description: '', logo: '' };

    service.editProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(service.baseURL);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

  // Test deleteProduct debe eliminar el producto y retornar true
  it('should remove the product and return true', () => {
    
    const productId = '3';

    service.deleteProduct(productId).subscribe(result => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne(`${service.baseURL}/?id=${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Test verifyProduct debe retornar true si el producto con dado id existe
  it('should return product verification result', () => {
    
    const productId = '3';
    const verificationResult = true ;

    service.verifyProduct(productId).subscribe(result => {
      expect(result).toEqual(verificationResult);
    });

    const req = httpMock.expectOne(`${service.baseURL}/verification?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(verificationResult);
  });
});
