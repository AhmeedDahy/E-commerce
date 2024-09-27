import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  KeyValuePipe,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router, RouterOutlet } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { CategoriesComponent } from '../categories/categories.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    MenubarModule,
    RouterOutlet,
    NgFor,
    CardModule,
    TitleCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private productService = inject(ProductsService);
  public products: any[] = [];

  constructor() {
    this.productService.products().subscribe({
      next: (response) => {
        this.products = response;
      },
    });
  }
}
