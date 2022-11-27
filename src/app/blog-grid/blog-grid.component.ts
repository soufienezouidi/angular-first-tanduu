import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css'],
})
export class BlogGridComponent implements OnInit {
  blogs: any = [];
  blog = true;
  constructor(public blogservice: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
    window.scrollTo(0, 0);
  }
  blogss: any[];
  getBlogs() {
    this.blogservice.getblogs().subscribe((res) => {
      this.blogss = res;
    });
  }
}
