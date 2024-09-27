import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { BlogpostServices } from '../services/blogpost.service';
import { ButtonModule } from 'primeng/button';

const productsColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'title', header: 'Title' },
  { field: 'category', header: 'Category' },
  { field: 'description', header: 'Description' },
];

const blogsColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'title', header: 'Title' },
  { field: 'body', header: 'Body' },
  { field: 'tags', header: 'Tags' },
];

const categoriesColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Category' },
];

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TabViewModule, TableModule, NgTemplateOutlet, NgFor, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  productsContext = { $implicit: [] as any[], columns: productsColumns };
  categoriesContext = { $implicit: [] as any[], columns: categoriesColumns };
  blogsContext = { $implicit: [] as any[], columns: blogsColumns };

  private productService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private blogsService = inject(BlogpostServices);

  activeIndex = 0;

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadBlogs();
  }

  private loadProducts() {
    this.productService.products().subscribe({
      next: (response) => {
        this.productsContext = {
          ...this.productsContext,
          $implicit: response,
        };
      },
    });
  }

  private loadCategories() {
    this.categoriesService.categories().subscribe({
      next: (response) => {
        this.categoriesContext = {
          ...this.categoriesContext,
          $implicit: response.map((item: any, index: any) => ({
            id: index + 1,
            name: item,
          })),
        };
      },
    });
  }

  private loadBlogs() {
    this.blogsService.getData().subscribe({
      next: (response) => {
        this.blogsContext = {
          ...this.blogsContext,
          $implicit: response.posts,
        };
      },
    });
  }

  add(row: number) {}
  update(row: number) {}

  remove(row: any) {
    if (this.activeIndex === 0) {
      this.productService.deleteProduct(row.id).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.loadProducts();
        },
      });
    } else if (this.activeIndex === 1) {
      const categoryName = row.name;
      this.categoriesService.deleteCategory(categoryName).subscribe({
        next: (response) => {
          console.log('Category deleted:', response);

          this.categoriesContext.$implicit =
            this.categoriesContext.$implicit.filter(
              (item) => item.name !== categoryName
            );
        },
      });
    } else if (this.activeIndex === 2) {
      this.blogsService.deletePost(row.id).subscribe({
        next: (response) => {
          console.log('Blog deleted:', response);
          this.blogsContext.$implicit = this.blogsContext.$implicit.filter(
            (item) => item.id !== row.id
          );
        },
      });
    }
  }
}
