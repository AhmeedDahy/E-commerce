import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogpostServices {
  private postUrl = 'https://dummyjson.com/posts';
  private commentUrl = 'https://dummyjson.com/comments/post/';
  private postsList: any[] = [];

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    if (this.postsList.length > 0) {
      return of({ posts: this.postsList });
    }
    return this.http.get<any>(this.postUrl).pipe(
      tap((response) => {
        this.postsList = response.posts;
      })
    );
  }

  getPost(id: string): Observable<any> {
    return this.http.get<any>(`${this.postUrl}/${id}`);
  }

  getComments(id: string): Observable<any> {
    return this.http.get<any>(`${this.commentUrl}${id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${id}`).pipe(
      tap(() => {
        this.postsList = this.postsList.filter((post) => post.id !== id);
      })
    );
  }
}
