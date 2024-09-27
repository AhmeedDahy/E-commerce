import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [NgIf, NgFor, CardModule, RouterLink, TitleCasePipe],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.css',
})
export class CategoriesDetailsComponent {
  private categoryService = inject(CategoriesService);
  public categoryDetails: any;
  private route = inject(ActivatedRoute);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.categoryDetails(id).subscribe({
        next: (response) => {
          this.categoryDetails = response.products;
        },
      });
    }
  }
}
