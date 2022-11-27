import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../../common-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


blogs: any = [];
  blog = true;
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getBlogs();
    window.scrollTo(0, 0);
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((result) => {
      this.blogs = result;
    });
  }

}
