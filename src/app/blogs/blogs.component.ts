import { Component } from '@angular/core';
import { BlogpostServices } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  data: any[] = [];

  constructor(private dataService: BlogpostServices, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response.posts;
      },
      error: (error) => console.error('Error while fetching data:', error),
    });
  }

  viewPost(id: number) {
    this.router.navigate(['/blogs', id]);
  }
}
