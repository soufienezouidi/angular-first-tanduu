import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { css } from 'jquery';

import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';
import { CommonServiceService } from './../../common-service.service';
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  doctorDetails;
  doctorId;
  firstName;
  lastName;
  email;
  phone;
  appointments: any = [];
  patients: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private categser: CategoriesService,
    private orderser: OrdersService
  ) {}
  currentuser: any;
  islogged: boolean = false;
  partner: any;
  date: any;
  time: any;
  services: number[] = [];
  finalservices: any[] = [];
  customer: any;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;

  ngOnInit(): void {
    this.partner = JSON.parse(localStorage.getItem('part'));

    this.currentuser = JSON.parse(localStorage.getItem('main'));

    this.currentuser.location = JSON.parse(this.currentuser.location);

    this.descriptionss = '';
    if (this.currentuser) {
      this.islogged = true;
      this.firstName = this.currentuser.first_name;
      this.lastName = this.currentuser.last_name;
      this.email = this.currentuser.email;
      this.country = this.currentuser.location.country;
      this.zipcode = this.currentuser.location.zipcode;
      this.street = this.currentuser.location.street_name;
      this.city = this.currentuser.location.city;

      this.state = this.currentuser.location.state;
      this.orderser
        .getcustomerbyuserid(this.currentuser.id)
        .subscribe((e: any) => {
          this.customer = e;
        });
    }
    this.services = JSON.parse(localStorage.getItem('servs'));
    this.services.forEach((e: number) => {
      this.categser.getservicebyid(e).subscribe((e: any) => {
        this.finalservices.push(e);
      });
    });

    /*localStorage.removeItem('part');
    localStorage.removeItem('servs');*/
  }

  getDoctorsDetails() {
    if (!this.doctorId) {
      this.doctorId = 1;
    }
    this.commonService.getDoctorDetails(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
  }
  counter(i: number) {
    return new Array(i);
  }
  files: File[] = [];
  s;
  checkedup: boolean = false;
  checkedad: boolean = false;
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  allPatients() {}

  patientDetails() {
    let userId = localStorage.getItem('main');
    this.commonService.getPatientDetails(Number(userId)).subscribe((res) => {
      this.patients = res;
    });
  }
  descriptionss: string = " ''";
  booking() {
    var ordrer: any = {
      appointment_date: '2009-06-15T13:45:30',
      status: 'Neu',
      show_mobile: false,
      description: this.descriptionss,
      jobberId: this.partner.id,
      customerId: this.customer.id,
      services: this.services,
      street: this.street,
      street_nb: 4,
      bloc: 'bloc',
      appartment: 'appartment',
      zip_code: this.zipcode,
      city: this.city,
      state: this.state,
      country: this.country,
      longitude: 12456997.1452,
      latitude: 12456997.1452,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderser.sendjobrequest(ordrer).subscribe((el: any) => {
          Swal.fire('Success!', el.message, 'success');
        });
      }
    });
  }
}
