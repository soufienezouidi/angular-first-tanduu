import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  id;
  commentsnbr: number = 0;
  blogdetails: any = [];
  blogcomments: any[] = [];
  blogs: any = [];
  comments: any = [];
  name = '';
  email = '';
  usercomment = '';
  constructor(
    private toastr: ToastrService,
    private blogser: BlogService,
    private route: ActivatedRoute,
    private autser: AuthenticationService,

    public router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userconnected = JSON.parse(localStorage.getItem('main'));
    if (this.userconnected == null) {
      this.showcommentadd = false;
    } else {
      this.showcommentadd = true;
    }
  }
  userconnected;
  any;
  showcommentadd: boolean = false;
  pagenumber: number = 1;
  serviceLang: any;
  currentLanguage: any;
  descauth: any = {
    name_en:
      "As a part of Tanduu community, I'm delighted to be providing you with several interesting articles to read about, treating many topics that you, dear readers, definitely will enjoy. ",
    name_fr:
      'En tant que membre de la communauté Tanduu, je suis ravie de vous proposer plusieurs articles intéressants à lire, traitant de nombreux sujets que vous, chers lecteurs, apprécierez certainement.',
    name_de:
      'Als Teil der Tanduu-Community freue ich mich, Ihnen einige interessante Artikel zum Lesen zu liefern, in denen viele Themen behandelt werden, die Ihnen, liebe Leser, sicherlich gefallen werden.',
  };
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
    this.serviceLang = 'name_' + localStorage.getItem('language');

    window.scroll(0, 0);
    window.scrollTo(0, 0);

    this.blogser.getblogbyid(this.id).subscribe((blog: any) => {
      this.blogdetails = blog;
      this.blogdetails.author = JSON.parse(this.blogdetails.author);
      this.blogdetails.hashtags = JSON.parse(this.blogdetails.hashtags);
    });
    this.blogser.getallblogcomments(this.id).subscribe((comments: any) => {
      this.blogcomments = comments;
      this.commentsnbr = this.blogcomments.length;
      this.blogcomments.forEach((e: any) => {
        e.comment = JSON.parse(e.comment);
        e.author = JSON.parse(e.author);
      });
    });
    this.getallhashtags();
    this.getallcategs();
    this.getBlogs();
  }
  blogss: any[] = [];
  blogsOptions = {
    loop: true,
    margin: 15,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left custom-arrow"></i>',
      '<i class="fas fa-chevron-right custom-arrow"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 4,
      },
    },
  };
  finalblogs: any[] = [];
  getBlogs() {
    this.blogser.getblogs().subscribe((res) => {
      this.blogss = res;
      this.blogss.filter(
        (s: any) => s.languages == localStorage.getItem('language')
      );
      this.blogss.forEach((element) => {
        if (element.languages === localStorage.getItem('language')) {
          this.finalblogs.push(element);
        }
        element.author = JSON.parse(element.author);
        element.hashtags = JSON.parse(element.hashtags);
      });
    });
  }
  addcomment() {
    this.autser.getuserbyid(this.userconnected.id).subscribe((usr: any) => {
      var commentss: any = {
        author: usr,
        text: this.usercomment,
      };
      this.blogser
        .addcommenttoblog(this.id, commentss)
        .subscribe((comments: any) => {
          this.ngOnInit();
        });
    });
  }
  categss: any[] = [];
  getallcategs() {
    this.blogser.getallcategs().subscribe((res) => {
      this.categss = res.stats;
      this.categss.forEach((ec: any) => {
        ec['category.languages'] = JSON.parse(ec['category.languages']);
      });
    });
  }
  hashtagsi: any[] = [];
  hashtags: any[] = [];
  getallhashtags() {
    this.blogser.getallshashtags().subscribe((res: any) => {
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
  gotoblogfrombottom(id) {
    this.router.navigate(['/blog-details', id]).then((e) => {
      window.location.reload();
    });
  }
}
