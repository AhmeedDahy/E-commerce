import { Component, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, NgIf, CardModule, TitleCasePipe, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  private categoryService = inject(CategoriesService);
  public categories: any[] = [];

  constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.categories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  deleteCategory(name: string) {
    this.categoryService.deleteCategory(name).subscribe({
      next: () => {
        this.categories = this.categories.filter(
          (category) => category !== name
        );
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }
}
