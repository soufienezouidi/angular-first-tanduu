import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { CommonServiceService } from '../common-service.service';
import { Doctors } from '../home-six/home-six.component';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-tanduu-pro',
  templateUrl: './tanduu-pro.component.html',
  styleUrls: ['./tanduu-pro.component.css'],
})
export class TanduuProComponent implements OnInit {
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;
  specialityList: any = [];
  doctors: any = [];
  slidepage: any;
  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
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
  constructor(
    public router: Router,
    public commonService: CommonServiceService
  ) {
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map((employee) =>
        employee ? this._filterEmployees(employee) : this.doctors.slice()
      )
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getspeciality();
    this.getDoctors();
    this.getblogs();

    // User's voice slider
    $('.testi-slider').each(function () {
      var $show = $(this).data('show');
      var $arr = $(this).data('arrow');
      var $dots = !$arr;
      var $m_show = $show;
      if ($show == 3) $m_show = $show - 1;
      $(this).slick({
        slidesToShow: $show,
        slidesToScroll: 1,
        arrows: $arr,
        autoplay: true,
        enabled: true,

        draggable: false,

        autoplaySpeed: 6,
        adaptiveHeight: true,
        prevArrow:
          '<button type="button" class="prev-nav"><i class="icon ion-ios-arrow-back"></i></button>',
        nextArrow:
          '<button type="button" class="next-nav"><i class="icon ion-ios-arrow-forward"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: $m_show,
              slidesToScroll: 1,
              infinite: true,
              arrows: $arr,
              dots: $dots,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    });
  }
  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(
      (state) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slide4 = [
    {
      img: 'assets/img/slide1.jpg',
    },
    {
      img: 'assets/img/slide2.jpg',
    },
  ];

  slides = [
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-02.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Neurology',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-03.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Orthopedic',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-04.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Cardiologist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-05.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Dentist',
      position: 'CEO of VoidCoders',
    },
    {
      img: 'assets/img/specialities/specialities-01.png',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'Urology',
      position: 'CEO of VoidCoders',
    },
  ];

  slideConfig4 = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
    speed: 50,
    variableWidth: true,
    arrows: false,
    autoplay: true,
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
    });
  }

  selectEvent(item) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl('/patients/doctor-profile?id=' + filter[0].id);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  searchdoctor() {
    this.router.navigate(['/patients/search-doctor']);
  }

  //// next step 2
  sliderContent = [
    {
      img: 'assets/img/features/feature-01.jpg',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'National Buiseness card',
      position: 'National',
    },
    {
      img: 'assets/img/features/feature-02.jpg',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: ' International Buiseness card',
      position: 'Nationally',
    },
    {
      img: 'assets/img/features/feature-03.jpg',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'connect',
      position: 'connect',
    },
    {
      img: 'assets/img/features/feature-04.jpg',
      msg: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry."',
      name: 'info',
      position: 'info',
    },
  ];
  slideConfigure = {
    dots: false,
    autoplay: false,
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
}
