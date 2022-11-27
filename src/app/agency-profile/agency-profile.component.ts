import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.css'],
})
export class AgencyProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  clinicsliderConfig = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
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
          slidesToShow: 3,
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
  clinicsliderslides = [
    {
      img: 'assets/img/icons/clinic-01.png',
      imghover: 'assets/img/icons/clinic-hover-01.png',
      department: 'PLumbers',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-02.png',
      imghover: 'assets/img/icons/clinic-hover-02.png',
      department: 'Pipe cleaners',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-03.png',
      imghover: 'assets/img/icons/clinic-hover-03.png',
      department: 'Pest controllers',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-04.png',
      imghover: 'assets/img/icons/clinic-hover-04.png',
      department: 'Sound engineers',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-05.png',
      imghover: 'assets/img/icons/clinic-hover-05.png',
      department: 'PLumbers',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-06.png',
      imghover: 'assets/img/icons/clinic-hover-06.png',
      department: 'PLumbers',
      doctors: '124',
    },
    {
      img: 'assets/img/icons/clinic-07.png',
      imghover: 'assets/img/icons/clinic-hover-07.png',
      department: 'PLumbers',
      doctors: '124',
    },
  ];
}
