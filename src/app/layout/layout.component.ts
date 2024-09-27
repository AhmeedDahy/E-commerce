import { Component, inject } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { MenubarModule } from 'primeng/menubar';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CategoriesComponent, MenubarModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private router = inject(Router);
  items: MenuItem[] | undefined;
  isAdmin: boolean = localStorage.getItem('role') === 'admin';

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home',
      },
      {
        label: 'Products',
        icon: 'pi pi-search',
        routerLink: 'products',
      },
      {
        label: 'Categories',
        icon: 'pi pi-star',
        routerLink: 'categories',
      },
      {
        label: 'Blogs',
        icon: 'pi pi-envelope',
        routerLink: 'blogs',
      },
      this.isAdmin
        ? {
            label: 'Admin-Dashboard',
            routerLink: 'admin',
          }
        : {},
    ];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
