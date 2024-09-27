import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products/category-list';
  private categoriesList: any[] = [];

  constructor() {}

  categories(): Observable<any> {
    if (this.categoriesList.length > 0) {
      return of(this.categoriesList);
    }
    return this.http.get<any>(this.apiUrl).pipe(
      map((resp) => {
        this.categoriesList = resp;
        return this.categoriesList;
      })
    );
  }

  categoryDetails(name: string): Observable<any> {
    return this.http.get<any>(
      `https://dummyjson.com/products/category/${name}`
    );
  }

  deleteCategory(name: string): Observable<any> {
    this.categoriesList = this.categoriesList.filter(
      (category) => category !== name
    );
    return of({ success: true });
  }
}
