import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, NotAuthGuard } from './../app/core/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductsComponent } from './products/products.component';
import { BlogsDetailsComponent } from './blogs/blogs-details/blogs-details.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products/:id',
        component: ProductsDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'categories/:id',
        component: CategoriesDetailsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'blogs', component: BlogsComponent, canActivate: [AuthGuard] },
      {
        path: 'blogs/:id',
        component: BlogsDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
