import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CardModule,
    TitleCasePipe,
    RouterLink,
    PaginatorModule,
    AsyncPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productService = inject(ProductsService);
  public response: any;
  public pageSize?: number = 6;

  constructor() {}

  ngOnInit() {
    this.loadProducts(this.pageSize, 0).subscribe({
      next: (resp) => (this.response = resp),
    });
  }

  onPageChange(event: PaginatorState) {
    const skip = event.first;

    this.pageSize = event.rows;
    if (skip) {
      this.loadProducts(this.pageSize, skip).subscribe({
        next: (resp) => (this.response = resp),
      });
    } else {
      this.loadProducts(this.pageSize, skip).subscribe({
        next: (resp) => (this.response = resp),
      });
    }
  }

  loadProducts(limit?: number, skip?: number) {
    return this.productService.getProducts(limit, skip);
  }
}
