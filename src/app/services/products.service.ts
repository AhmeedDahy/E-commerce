import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';
  private productsList: any[] = [];

  constructor() {}

  products() {
    if (this.productsList.length > 0) {
      return of(this.productsList);
    }
    return this.http.get<any>(`${this.apiUrl}?limit=0&skip=0`).pipe(
      map((resp) => {
        const totalProducts = resp.products;
        this.productsList = totalProducts;
        return totalProducts;
      })
    );
  }

  productsDetails(id: number) {
    if (this.productsList.length > 0) {
      const foundProduct = this.productsList.find(
        (product) => product.id === id
      );
      if (foundProduct) {
        return of(foundProduct);
      }
    }
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProducts(limit?: number, skip?: number) {
    if (this.productsList.length > 0) {
      skip = skip ?? 0;
      limit = limit ?? 0;
      const slicedProducts = this.productsList.slice(skip, skip + limit);
      return of({
        limit,
        skip,
        products: [...slicedProducts],
        total: this.productsList.length,
      });
    }
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product).pipe(
      tap((resp: any) => {
        let lastId = this.productsList[this.productsList.length - 1].id;
        this.productsList.push({
          ...resp,
          id: ++lastId,
        });
      })
    );
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product).pipe(
      tap((resp: any) => {
        this.productsList = this.productsList.map((item) => {
          return item.id === id ? { ...item, ...product } : item;
        });
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap((resp: any) => {
        this.productsList = this.productsList.filter((item) => {
          return item.id !== id;
        });
      })
    );
  }
}
