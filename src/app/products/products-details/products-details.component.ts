import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CardModule, NgIf, TitleCasePipe],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  private productService = inject(ProductsService);
  public productDetails: any;
  private route = inject(ActivatedRoute);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.productsDetails(+id).subscribe({
        next: (response) => {
          this.productDetails = response;
        },
      });
    }
  }
}
