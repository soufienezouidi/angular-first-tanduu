import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import { BlogService } from '../../../services/tandu-admin/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: any = [];
  firstBlock: any = [];
  constructor(public blogserve: BlogService, public router: Router) {
    this.getBlogs();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  gotoblogedit(blog: any) {
    this.router.navigateByUrl('/tanduu-admin/edit-blog?id=' + blog['id']);
  }
  blogsfr : any[]=[]
  blogsen :  any[]=[]
  blogsde : any[]=[]
  getBlogs() {
    this.blogserve.getblogs().subscribe((result) => {
      this.blogs = result;
      console.log(result)
      this.blogs.forEach((element) => {
        element.author = JSON.parse(element.author);
        if(element.languages == "fr"){
          this.blogsfr.push(element)
        }
        if(element.languages == "de"){
          this.blogsde.push(element)
        }  if(element.languages == "en"){
          this.blogsen.push(element)
        }
      });
    });
  }
}
