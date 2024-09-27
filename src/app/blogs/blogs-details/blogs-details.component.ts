import { Component } from '@angular/core';
import { BlogpostServices } from '../../services/blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-blogs-details',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './blogs-details.component.html',
  styleUrl: './blogs-details.component.css',
})
export class BlogsDetailsComponent {
  id: string | null = null;
  post: any;
  comments: any[] = [];

  constructor(
    private dataService: BlogpostServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.dataService.getPost(this.id).subscribe({
        next: (response) => {
          console.log(response);
          this.post = response;
        },
        error: (error) => console.error('Error while fetching data:', error),
      });

      this.dataService.getComments(this.id).subscribe({
        next: (response) => {
          console.log(response);
          this.comments = response.comments;
        },
      });
    } else {
      console.error('Invalid post ID');
    }
  }
}
