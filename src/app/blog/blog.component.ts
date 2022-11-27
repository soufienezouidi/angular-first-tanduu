import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: any = [];
  firstBlock: any = [];
  blog = true;
  page: number = 1;
  numberofsteps: number;
  constructor(
    public blogservice: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  serviceLang: any;
  currentLanguage: any;
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + localStorage.getItem('language');

    this.route.queryParams.subscribe((params: any) => {
      this.page = params.page;
      this.getBlogs();
      this.getallhashtags();
      this.getallcategs();
      window.scrollTo(0, 0);
    });
  }
  splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
  }
  blogss: any[];
  blogsstoshow: any[];
  alphabetPairs: any[];
  stepselected: number;
  finalbolgs: any[] = [];

  getBlogs() {
    this.blogservice.getblogs().subscribe((res) => {
      this.blogss = res;

      this.blogss.forEach((element) => {
        element.author = JSON.parse(element.author);
        element.hashtags = JSON.parse(element.hashtags);
        if (element.languages == localStorage.getItem('language')) {
          this.finalbolgs.push(element);
        }
      });

      this.alphabetPairs = this.splitArrayIntoChunksOfLen(this.finalbolgs, 5);

      this.numberofsteps = this.alphabetPairs.length;
      this.blogsstoshow = this.alphabetPairs[this.page - 1];
      this.stepselected = this.page - 1;
    });
  }
  categss: any[] = [];
  getallcategs() {
    this.blogservice.getallcategs().subscribe((res) => {
      this.categss = res.stats;

      this.categss.forEach((ec: any) => {
        ec['category.languages'] = JSON.parse(ec['category.languages']);
      });
      this.categss = this.categss.sort(
        (n1, n2) => n2.numberOfCategory - n1.numberOfCategory
      );
    });
  }
  hashtagsi: any[] = [];
  hashtags: any[] = [];
  getallhashtags() {
    this.blogservice.getallshashtags().subscribe((res: any) => {
      this.hashtags = res.hashtags;

      this.hashtags.forEach((hash: any) => {
        hash.hashtags = JSON.parse(hash.hashtags);
        if (hash.hashtags) {
          hash.hashtags.forEach((element: any) => {
            var p: any[] = hash.hashtags;
            p.forEach((items: any) => {
              this.hashtagsi.push(items);
            });
          });
        }
      });
    });
  }
  counter(i: number) {
    return new Array(i);
  }
  changeblogs(i: number) {
    this.blogsstoshow = this.alphabetPairs[i];
    this.stepselected = i;
    this.router.navigate(['/blog'], { queryParams: { page: i + 1 } });
  }
}
