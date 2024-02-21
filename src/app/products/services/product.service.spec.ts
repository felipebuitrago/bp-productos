import { TestBed, flush } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../interfaces/product.interface';
import { environment } from '../../../environments/environments';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

const mockProducts: Product[] = [
  { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
  { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
  { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' },
];

const mockSimpleProduct: Product = { id: '333', name: 'Tarjeta Credito', date_release: new Date(), date_revision: new Date(), description: 'Tarjeta Credito Mastercard', logo: 'lint/to/product/logo' };

// describe('ProductService', () => {
//   let service: ProductService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [ProductService]
//     });
//     service = TestBed.inject(ProductService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); 
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // Test getProducts debe retornar los productos
//   it('should return a list of products', (done) => {

//     service.getProducts().subscribe(products => {
//       expect(products.length).toBe(mockProducts.length);
//       expect(products).toEqual(mockProducts);
//       done();
//     });

//     const req = httpMock.expectOne(environment.apiBaseUrl);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockProducts);
//   });

//   // Test createProduct debe crear el producto y retornarlo
//   it('should create a new product and return it', (done) => {
    
//     service.createProduct(mockSimpleProduct).subscribe(product => {
//       expect(product).toEqual(mockSimpleProduct);
//       done();
//     });

//     const req = httpMock.expectOne(environment.apiBaseUrl);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(mockSimpleProduct);
    
//     req.flush(mockSimpleProduct);
//   });

//   // Test editProduct debe actualizar el producto y retornarlo
//   it('should update the product and return it', (done) => {

//     service.editProduct(mockSimpleProduct).subscribe(product => {
//       expect(product).toEqual(mockSimpleProduct);
//       done();
//     });

//     const req = httpMock.expectOne(environment.apiBaseUrl);
//     expect(req.request.method).toBe('PUT');
//     expect(req.request.body).toEqual(mockSimpleProduct);
    
//     req.flush(mockSimpleProduct);
//   });

//   // Test deleteProduct debe eliminar el producto y retornar true
//   it('should remove the product and return true', (done) => {
    
//     const productId = '333';

//     service.deleteProduct(productId).subscribe(result => {
//       expect(result).toBeTruthy();
//       done();
//     });

//     const req = httpMock.expectOne(`${environment.apiBaseUrl}/?id=${productId}`);
//     expect(req.request.method).toBe('DELETE');

//     req.flush({});
//   });

//   // Test verifyProduct debe retornar true si el id del esta en uso
//   it('should return product verification result', (done) => {
    
//     const productId = '333';

//     service.verifyProduct(productId).subscribe(result => {
//       expect(result).toBeTruthy();
//       done()
//     });

//     const req = httpMock.expectOne(`${environment.apiBaseUrl}/verification?id=${productId}`);
//     expect(req.request.method).toBe('GET');

//     req.flush(true);
//   });
// });


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

  test('should return a list of products', (done) => {
    
    service.getProducts().subscribe( products => {
        console.log(products instanceof Array);
        expect( products ).toBeInstanceOf(Array<Product[]>);
        done();
      })
  });
});