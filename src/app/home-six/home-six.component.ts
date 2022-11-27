import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { map, startWith } from 'rxjs/operators';
import { CommonServiceService } from '../common-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CategoriesService } from './../services/categories.service';
import { BlogService } from '../services/blog.service';
import { ExpressService } from '../services/tandu-admin/express.service';
import { TranslateService } from '@ngx-translate/core';
import { Http2ServerRequest } from 'http2';
export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}
declare const $: any;

@Component({
  selector: 'app-home-six',
  templateUrl: './home-six.component.html',
  styleUrls: ['./home-six.component.css'],
})
export class HomeSixComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;
  specialityList: any = [];
  doctors: any = [];
  slidepage: any;
  serviceLang: any;
  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
  isMobile: boolean = false;
  dotsliderslides: any[] = [];
  dotsliderslidess: any[] = [];
  keyword = 'name';
  searchDoctor = [];
  public countries = [
    {
      id: 1,
      name: 'Albania',

      img: 'image',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
  ];
  clinicsslides: any[];
  clinicsslides2: any[];
  expresses: any[];
  blogss: any[];
  finalblogs: any = [];
  gotosubpage(i, p) {
    localStorage.setItem('categ', i);
    this.router.navigate(['/sub_categories'], {
      queryParams: { id: i },
    });
  }
  gotobannerprofile(item: any) {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  }
  constructor(
    public categservices: CategoriesService,
    public router: Router,
    public commonService: CommonServiceService,
    public blogservice: BlogService,
    public expressserv: ExpressService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language'));
    this.serviceLang = 'name_' + localStorage.getItem('language');
    if (this.serviceLang == 'name_fr') {
      this.dotsliderslides = [
        {
          img: 'assets/img/slider/provider french.png',
        },

        {
          img: 'assets/img/slider/excel.png',
          link: 'https://tanduu.com/excel.bureau..293',
        },
        {
          img: 'assets/img/slider/customer french.png',
        },

        {
          img: 'assets/img/slider/jawhara.png',
          link: 'https://tanduu.com/jawhara.signature..290',
        },
      ];
      this.dotsliderslidess = [
        {
          img: 'assets/img/slider/bannermobilefrancais.png',
        },
        {
          img: 'assets/img/slider/excell.png',
          link: 'https://tanduu.com/excel.bureau..293',
        },
        {
          img: 'assets/img/slider/jaw.png',
          link: 'https://tanduu.com/jawhara.signature..290',
        },
      ];
    }
    if (this.serviceLang == 'name_en') {
      this.dotsliderslides = [
        {
          img: 'assets/img/slider/provider english.png',
        },

        {
          img: 'assets/img/slider/customer english.png',
        },
      ];
      this.dotsliderslidess = [
        {
          img: 'assets/img/slider/banner mobile english.png',
        },
      ];
    }
    if (this.serviceLang == 'name_de') {
      this.dotsliderslides = [
        {
          img: 'assets/img/slider/customer german.png',
        },

        {
          img: 'assets/img/slider/provider deutsch.png',
        },
      ];
      this.dotsliderslidess = [
        {
          img: 'assets/img/slider/banner mobile deutsch.png',
        },
      ];
    }

    this.isMobile = this.deviceService.isMobile();

    this.categservices.getallcategories().subscribe((res) => {
      res.forEach((e: any) => {
        e.name = e.name.toLowerCase();
        e.languages = JSON.parse(e.languages);
        categservices
          .get_subcategoriesByCategoryid(e.id)
          .subscribe((el: any) => {
            el.forEach((element) => {
              element.languages = JSON.parse(element.languages);
            });
            if (el[0] && el[1]) {
              e.toshowsubs =
                el[0].languages[this.serviceLang] +
                ',' +
                el[1].languages[this.serviceLang];
            }
            if (el[0] && !el[1]) {
              e.toshowsubs = el[0].languages[this.serviceLang];
            }
          });
      });

      if (res.length % 2 !== 0) {
        let firsthalf: number = Math.trunc(res.length / 2) + 1;

        this.clinicsslides = res.slice(0, firsthalf);
        this.clinicsslides2 = res.slice(firsthalf, res.length);
      } else {
        let firsthalf: number = Math.trunc(res.length / 2);
        let secondhalf: number = res.length - firsthalf;
        this.clinicsslides = res.slice(0, firsthalf);
        this.clinicsslides2 = res.slice(firsthalf, res.length);
      }
    });

    this.blogservice.getblogs().subscribe((res) => {
      this.blogss = res;

      this.blogss.filter(
        (s: any) => s.languages == localStorage.getItem('language')
      );
      this.blogss.forEach((e: any) => {
        e.author = JSON.parse(e.author);
        if (e.languages === localStorage.getItem('language')) {
          this.finalblogs.push(e);
          this.finalblogs.slice(0, 5);
        }
      });
    });
    this.expressserv.getexpresslist().subscribe((res) => {
      this.expresses = res;
      this.expresses.forEach((ex: any) => {
        ex.languages = JSON.parse(ex.languages);
      });
    });
  }
  dotsliderConfig = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  dotsliderConfigs = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig2 = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    variableWidth: true,
    arrows: false,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  slideConfig3 = {
    dots: true,
    arrows: false,
    variableWidth: true,
  };
  booksliderConfig = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe((res) => {
      this.specialityList = res;
    });
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }

  getblogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
      this.blogs.forEach((element) => {
        element.author = JSON.parse(element.author);
      });
    });
  }

  slideConfigure = {
    dots: true,
    autoplay: true,
    infinite: true,
    variableWidth: true,
  };
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }

  nextpage() {
    this.slickModal3.slickNext();
  }

  prevpage() {
    this.slickModal3.slickPrev();
  }
  logged: boolean = false;
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('main'));
    if (this.user) {
      this.logged = true;
    }
    window.scrollTo(0, 0);

    // User's voice slider
  }
  clinicsOptions = {
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
        items: 3,
      },
      1000: {
        items: 4,
      },
      1300: {
        items: 6,
      },
    },
  };

  clinicfeatureOptions = {
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
        items: 3,
      },
      1000: {
        items: 4,
      },
      1300: {
        items: 5,
      },
    },
  };
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
  blogsslides = [
    {
      img: 'assets/img/blog-1.jpg',
      img2: 'assets/img/doctors/doctor-thumb-01.jpg',
      name: 'Dr. Ruby Perrin',
      department: 'Urology',
      header: 'Doccure – Making your clinic painless visit?',
      content:
        'Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.',
      date: '3 Dec 2021',
    },
    {
      img: 'assets/img/blog-2.jpg',
      img2: 'assets/img/doctors/doctor-thumb-01.jpg',
      name: 'Dr. Ruby Perrin',
      department: 'Neurology',
      header: 'What are the benefits of Online Doctor Booking?',
      content:
        'Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.',
      date: '3 Dec 2021',
    },
    {
      img: 'assets/img/blog-3.jpg',
      img2: 'assets/img/doctors/doctor-thumb-01.jpg',
      name: 'Dr. Ruby Perrin',
      department: 'Orthopedic',
      header: 'Benefits of consulting with an Online Doctor',
      content:
        'Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.',
      date: '3 Dec 2021',
    },
    {
      img: 'assets/img/blog-4.jpg',
      img2: 'assets/img/doctors/doctor-thumb-01.jpg',
      name: 'Dr. Ruby Perrin',
      department: 'Cardiologist',
      header: '5 Great reasons to use an Online Doctor',
      content:
        'Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.',
      date: '3 Dec 2021',
    },
  ];
  clinicfeatureslides = [
    {
      img: 'assets/img/countries/algeria.jpg',
      languages: {
        name_en: 'Algeria',
        name_fr: 'Algérie',
        name_de: 'Algerien',
      },
    },
    {
      img: 'assets/img/countries/austria.jpg',
      languages: {
        name_en: 'Austria',
        name_fr: "L'Autriche",
        name_de: 'Österreich',
      },
    },
    {
      img: 'assets/img/countries/belgium.jpg',
      languages: {
        name_en: 'Belgium',
        name_fr: 'Belgique',
        name_de: 'Belgien',
      },
    },
    {
      img: 'assets/img/countries/germany.jpg',
      languages: {
        name_en: 'Germany',
        name_fr: 'Allemagne',
        name_de: 'Deutschland',
      },
    },
    {
      img: 'assets/img/countries/fr.jpg',
      languages: {
        name_en: 'France',
        name_fr: 'la france',
        name_de: 'Frankreich',
      },
    },
    {
      img: 'assets/img/countries/liech.jpg',
      languages: {
        name_en: 'Liechtenstein',
        name_fr: 'Liechtenstein',
        name_de: 'Liechtenstein',
      },
    },
    {
      img: 'assets/img/countries/lux.jpg',
      languages: {
        name_en: 'Luxembourg',
        name_fr: 'Luxembourg',
        name_de: 'Luxemburg',
      },
    },
    {
      img: 'assets/img/countries/maroc.jpg',
      languages: {
        name_en: 'Morocco',
        name_fr: 'Maroc',
        name_de: 'Marokko',
      },
    },
    {
      img: 'assets/img/countries/mona.jpg',
      languages: {
        name_en: 'Monaco',
        name_fr: 'Monaco',
        name_de: 'Monaco',
      },
    },
    {
      img: 'assets/img/countries/swiss.jpg',
      languages: {
        name_en: 'Switzerland',
        name_fr: 'La Suisse',
        name_de: 'Schweiz',
      },
    },
    {
      img: 'assets/img/countries/tun.jpg',
      languages: {
        name_en: 'Tunisia',
        name_fr: 'La Tunisie',
        name_de: 'Tunesien',
      },
    },
    {
      img: 'assets/img/countries/uk.jpg',
      languages: {
        name_en: 'England',
        name_fr: 'Angleterre',
        name_de: 'united kingdom',
      },
    },
  ];
  ourdoctorsslides = [
    {
      img: 'assets/img/doctors/doctor-01.jpg',
      range: '$20 - $50',
      rating: '3.5',
      name: 'Dr. Ruby Perrin',
      speciality: 'BDS, MDS - Oral & Maxillofacial Surgery',
      address: 'Georgia, USA',
      count: '450',
    },
    {
      img: 'assets/img/doctors/doctor-04.jpg',
      range: '$20 - $50',
      rating: '3.5',
      name: 'Dr. Deborah Angel',
      speciality: 'MBBS, MD - General Medicine, DNB',
      address: 'Georgia, USA',
      count: '450',
    },
    {
      img: 'assets/img/doctors/doctor-03.jpg',
      range: '$20 - $50',
      rating: '3.5',
      name: 'Dr. Sofia Brient',
      speciality: 'MBBS, MS - General Surgery, MCh',
      address: 'Georgia, USA',
      count: '450',
    },
    {
      img: 'assets/img/doctors/doctor-02.jpg',
      range: '$20 - $50',
      rating: '3.5',
      name: 'Dr. Darren Elder',
      speciality: 'BDS, MDS - Oral & Maxillofacial Surgery',
      address: 'Georgia, USA',
      count: '450',
    },
  ];
  welcometext: any = {
    languages: {
      name_en:
        ' Using TanDuu is absolutely free. Simply enter your company, service or other offer and you will be found regionally, nationally or even worldwide.',
      name_fr:
        "L'utilisation de TanDuu est absolument gratuite. Enregistrez simplement votre entreprise, spécifiez vos services ou autres offres que vous proposez et vous serez trouvé au niveau régional, national ou même mondial.",
      name_de:
        'Die Nutzung von TanDuu ist absolut kostenlos. Tragen Sie einfach Ihre Firma, Dienstleistung oder ein sonstiges Angebot ein und Sie werden regional, überregional oder auch weltweit gefunden.',
    },
  };
  welcomeon: any = {
    languages: {
      name_en: 'Welcome on',
      name_fr: 'Bienvenue sur',
      name_de: 'Willkommen bei',
    },
  };
  gotosub(item) {
    localStorage.setItem('cat', item.id);
    this.router.navigate(['/category', item.category_link]).then((e) => {
      window.location.reload();
    });
  }
}
