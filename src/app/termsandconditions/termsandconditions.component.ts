import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  constructor(   private route: ActivatedRoute,private router: Router,
    private toastr: ToastrService,
    private compser: CompanyService,) { }
  companyurl : any
  companyDetails : any
  ngOnInit(): void {
    this.companyurl = this.route.snapshot.paramMap.get('name');
    console.log(this.companyurl)
    this.compser
    .getcompanybyusername(this.companyurl)
    .subscribe((com: any) => {
      this.companyDetails = com.company;
      console.log(this.companyDetails)});
      
  }

}
