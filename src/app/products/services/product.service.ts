import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL: string = environment.apiBaseUrl;
  private headers: HttpHeaders = new HttpHeaders({
    'authorId' : '33'
  });

  constructor(private httpClient : HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL, { headers: this.headers });
  }

  createProduct(product : Product) : Observable<Product> {
    //guardamos fecha con sistema horario UTC -5 para que el pipe Date funcione correctamente
    product.date_release = new Date(product.date_release + 'T00:00:00.000-05:00');
    product.date_revision = new Date(product.date_revision + 'T00:00:00.000-05:00');
    
    return this.httpClient.post<Product>( this.baseURL, { ...product }, { headers: this.headers, observe: 'response' } )
      .pipe(
        tap(response => {
          if (response.status !== 200) {
            throw new Error('bad request'); 
          }
        }),
        map(response => {

          return response.body || { id: '', name: '', date_release: new Date(), date_revision: new Date(), description: '', logo: '' }
        }),
        catchError(error => {
          
          return throwError(() => new Error('bad request'));
        })
      );
  }

  editProduct(product : Product) : Observable<Product> {
    //guardamos fecha con sistema horario UTC -5 para que el pipe Date funcione correctamente
    product.date_release = new Date(product.date_release + 'T00:00:00.000-05:00');
    product.date_revision = new Date(product.date_revision + 'T00:00:00.000-05:00');

    return this.httpClient.put<Product>( this.baseURL, { ...product }, { headers: this.headers, observe: 'response' } )
      .pipe(
        tap(response => {
          if (response.status !== 200) {
            throw new Error(); 
          }
        }),
        map(response => {

          return response.body || { id: '', name: '', date_release: new Date(), date_revision: new Date(), description: '', logo: '' }
        }),
        catchError(error => {
          
          return throwError(() => new Error(error));
        })
      );
  }

  deleteProduct(id : string): Observable<boolean> {

    return this.httpClient.delete<boolean>( `${this.baseURL}/?id=${id}`, { headers: this.headers, observe: 'response' } )
      .pipe(
        map(response => {
          
          return response.status === 200;
        }),
        catchError(error => {
          //? aunque la peticion este hecha correctamente la respuesta es enviada con un error
          //? por lo cual cae en el metodo catchError sin tener efecto el metodo tap como se procesa
          //?  la respuesta en otros metodos del servicio
          if (error.status === 200) {
            return of(true);
          }
          else {
            return throwError(() => new Error(error));
          }
        })
      );
  }
  
  verifyProduct(id : string | null) : Observable<boolean> {
    return this.httpClient.get<boolean>( `${this.baseURL}/verification?id=${id}`, { headers: this.headers } );
  }
}
