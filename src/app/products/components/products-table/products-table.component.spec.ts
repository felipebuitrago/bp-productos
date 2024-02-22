import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsTableComponent } from './products-table.component';
import { ProductService } from '../../services/product.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { environment } from '../../../../environments/environments';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent, FilterPipe, SnackbarComponent],
      imports: [HttpClientTestingModule],
      providers: [ ProductService ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock = TestBed.inject(HttpTestingController)
  });

  beforeEach(() => {
    httpMock.verify();
  });

  it('should delete product and show success message', (done) => {
    
    let id = 'tc-01'
    component.productToDelete.id = id;
    component.deleteProduct();

    let req = httpMock.expectOne(`${environment.apiBaseUrl}/?id=${id}`)
    expect(req.request.method).toBe('DELETE');

    jest.spyOn(component.snackbar, 'showSnackbar');
    
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      expect(component.deleteProduct).toHaveBeenCalled();
      expect(component.snackbar.showSnackbar).toHaveBeenCalledWith(`✅ Eliminado con éxito. ✅`);
      done();
    });

    console.log("✅ ProductsTableComponent should delete product and show success message ✅");

    done();
  });
  
});
