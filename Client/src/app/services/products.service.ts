import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../app/interfaces/product.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  productListUpdateSubject = new Subject<void>();
  $productListUpdate = this.productListUpdateSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductByName(productName: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productName}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    const response = this.http.put<Product>(
      `${this.apiUrl}/products/${id}`,
      product
    );
    return response;
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  notifyProductListWasUpdated(action: any) {
    this.productListUpdateSubject.next(action);
  }
}
