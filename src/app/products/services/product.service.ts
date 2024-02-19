import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  private headers: HttpHeaders = new HttpHeaders({
    'authorId' : '33'
  })

  constructor(private httpClient : HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL, { headers: this.headers })
  }

  createProduct(product : Product) : Observable<Product> {
    return this.httpClient.post<Product>( this.baseURL, { ...product }, { headers: this.headers } );
  }

  editProduct(product : Product) : Observable<Product> {
    return this.httpClient.put<Product>( this.baseURL, { ...product }, { headers: this.headers } );
  }

  deleteProduct(id : string): Observable<boolean> {
    return this.httpClient.delete( `${this.baseURL}/?id=${id}`, { headers: this.headers } )
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
    );
  }
  
  verifyProduct(id : string | null) : Observable<any> {
    return this.httpClient.get<any>( `${this.baseURL}/verification?id=${id}`, { headers: this.headers } );
  }
}