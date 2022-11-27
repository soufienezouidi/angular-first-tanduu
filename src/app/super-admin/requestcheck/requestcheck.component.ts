import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from 'src/app/services/company.service';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import Swal from 'sweetalert2';
import { runInThisContext } from 'vm';
import { data } from 'jquery';
import { CompaniesService } from 'src/app/admin/services/companies_services/companies.service';
declare var $: any;
@Component({
  selector: 'app-requestcheck',
  templateUrl: './requestcheck.component.html',
  styleUrls: ['./requestcheck.component.css'],
})
export class RequestcheckComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public categservices: CategoriesServices,
    private compservice: CompanyService,
    private modalService: BsModalService,
    private companyService: CompaniesService,
    private router: Router
  ) {}

  //basic
  resuestid: any;
  requester;
  currentrequest;

  suggestiondetails: any;
  //endbasic
  topushcategory: any;
  suggestedcategory: any = {};

  topushsubcategory: any;
  suggestedsubcategory: any = {};

  sugesstedservices: any[] = [];
  topushservices: any[] = [];
  listsubcategories: any[] = [];
  existingcategory: boolean = false;
  existingsubcategory: boolean = false;
  finalidcateg: number;
  finalidsubcateg: number;
  allservicessuggested: any[] = [];
  dropdownSettings: any;

  ngOnInit(): void {
    this.categservices.getallservices().subscribe((sers) => {
      this.allservicesindatabase = sers.data;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.getcategories();
    this.resuestid = this.activatedRoute.snapshot.paramMap.get('id');

    this.categservices.getsuggestionbyid(this.resuestid).subscribe((e) => {
      this.currentrequest = e.reqs;
      this.compservice
        .getcompanybyid(this.currentrequest.requesterId)
        .subscribe((c) => {
          if (!c.message) {
            this.requester = c;
          }
        });

      this.suggestiondetails = JSON.parse(this.currentrequest.suggestions);
      if (this.suggestiondetails.category.id) {
        this.finalidcateg = this.suggestiondetails.category.id;
        this.categservices
          .get_subcategoriesByCategoryid(this.suggestiondetails.category.id)
          .subscribe((subs) => {
            this.listsubcategories = subs;
            if (this.listsubcategories.length > 0) {
              this.showlistsubcategoriestochange = true;
            }
          });
        this.categservices
          .getcategorybyid(this.suggestiondetails.category.id)
          .subscribe((cat) => {
            this.categoryselected = cat;
            cat.languages = JSON.parse(cat.languages);
            this.suggestedcategory = cat;
            this.topushcategory = cat;
            this.existingcategory = true;
            if (this.suggestiondetails.sub.id) {
              let result: any[] = this.listsubcategories.filter(
                (word) => word.id == this.suggestiondetails.sub.id
              );
          
              result[0].languages = JSON.parse(result[0].languages);
              this.topushsubcategory = result[0].name;
              this.subcategoryselected = result[0];
              this.suggestedsubcategory.name = result[0].name;

              this.existingcategory = true;
              this.finalidsubcateg = this.suggestiondetails.sub.id;
            }
          });
      } else {
        this.suggestedcategory.name = this.suggestiondetails.category.name;
        this.existingcategory = false;
        this.suggestedsubcategory.name = this.suggestiondetails.sub.name;
        this.existingsubcategory = false;
      }



      this.sugesstedservices = this.suggestiondetails.services;
      this.sugesstedservices.forEach((ee) => {
        let itemservice: any = {
          name_en: ee.name,
          name_fr: ee.name,
          name_de: ee.name,
          approved: false,
        };

        this.allservicessuggested.push(itemservice);
      });
    });
  }
  categs: any[] = [];
  allcategs: any[] = [];
  categsa: any[] = [];
  categsd: any[] = [];
  categsp: any[] = [];
  getcategories() {
    this.categsa = [];
    this.categsd = [];
    this.categsp = [];
    this.categservices.getcategories().subscribe((result) => {
      this.categs = result;
      this.categs.forEach((e: any) => {
        e.languages = JSON.parse(e.languages);
      });
      this.allcategs = result;
      this.allcategs.forEach((currentValue, index) => {
        if (currentValue.is_accepted && !currentValue.is_deleted) {
          this.categsa.push(currentValue);
        }
        if (!currentValue.is_accepted) {
          this.categsp.push(currentValue);
        }
        if (currentValue.is_deleted && currentValue.is_accepted) {
          this.categsd.push(currentValue);
        }
      });
    });
  }
  cateo;
  showlistexistcategory: boolean = false;
  categoryselected: any;
  changecategory() {
    this.showlistexistcategory = true;
  }
  switchcategory() {
    this.showlistexistcategory = true;
  }

  backtosugg() {
    this.showlistexistcategory = false;
    this.existingcategory = false;
  }
  showlistsubcategoriestochange: boolean = false;
  onChange(deviceValue) {
    this.subcategoryapproved = false;
    this.categoryapproved = false;
    this.showlistexistsubcategory = false;
    if (this.suggestiondetails.sub.id) {
      this.existingcategory = true;
      this.finalidsubcateg = this.suggestiondetails.sub.id;
      let result: any[] = this.listsubcategories.filter(
        (word) => word.id == this.suggestiondetails.sub.id
      );
      result[0].languages = JSON.parse(result[0].languages);
      this.topushsubcategory = result[0].name;
      this.subcategoryselected = result[0];
      this.suggestedsubcategory = result[0].name;
    } else {
      this.suggestedsubcategory.name = this.suggestiondetails.sub.name;
    }
    this.categservices.getcategorybyid(deviceValue).subscribe((cat) => {
      this.finalidcateg = deviceValue;
      cat.languages = JSON.parse(cat.languages);
      this.suggestedcategory = cat;
      this.finalcateogryforuser = cat;
      this.topushcategory = cat;
      this.existingcategory = true;

      this.categservices
        .get_subcategoriesByCategoryid(deviceValue)
        .subscribe((res) => {
          this.listsubcategories = res;
          if (this.listsubcategories.length > 0) {
            this.showlistsubcategoriestochange = true;
            this.existingsubcategory = true;
          } else {
            this.existingsubcategory = false;
          }
        });
    });
  }
  //subs

  showlistexistsubcategory: boolean = false;
  subcategoryselected: any = {};
  changesubcategory() {
    this.showlistexistsubcategory = true;
  }
  switchsubcategory() {
    this.showlistexistsubcategory = true;
  }
  listallservicess: any[] = [];
  showlistservicess: boolean = false;
  onChangesub(deviceValue) {
    this.subcategoryapproved = false;
    //cat.languages = JSON.parse(cat.languages);
    let result: any[] = this.listsubcategories.filter(
      (word) => word.id == deviceValue
    );
    this.suggestedsubcategory = result[0];
    this.finalsubcateogryforuser = result[0];
    result[0].languages = JSON.parse(result[0].languages);
    this.topushsubcategory = result[0];
    this.existingsubcategory = true;
    this.finalidsubcateg = deviceValue;
    this.categservices
      .get_servicesBysubcategoriesid(deviceValue)
      .subscribe((sers) => {
        this.listallservicess = sers;
        if (this.listallservicess.length > 0) {
          this.showlistservicess = true;
        }
      });
  }
  modalRef: BsModalRef;
  categoryapproved: boolean = false;
  approvecateg(template: TemplateRef<any>) {
    this.subcategoryapproved = false;
    if (!this.existingcategory) {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-md modal-dialog-centered',
      });
    } else {
      this.finalcateogryforuser = this.suggestedcategory;
      this.categoryapproved = true;
    }
  }
  subcategoryapproved: boolean = false;

  approvesubcateg(template: TemplateRef<any>) {
    if (!this.existingsubcategory) {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-md modal-dialog-centered',
      });
    } else {
      this.subcategoryapproved = true;
      this.finalsubcateogryforuser = this.suggestedsubcategory;
    }
  }

  decline() {
    this.modalRef.hide();
  }
  reset() {
    window.location.reload();
  }
  showlistexistservices: boolean = false;
  switchservice() {
    this.showlistexistservices = true;
  }
  serviceselected: any[] = [];

  prefinalservicestopush: number[] = [];
  onChangeservice(selectedservice) {
    let itemnbr: number = this.prefinalservicestopush.indexOf(selectedservice);
    if (itemnbr == -1) {
      this.prefinalservicestopush.push(selectedservice);
    }
  }
  categengname: string;
  categfrname: string;
  categdename: string;
  addcategory() {
    const categ: any = {
      name_fr: this.categfrname,
      name_en: this.categengname,
      name_de: this.categdename,
      is_accepted: false,
    };
    this.categservices.addcategory(categ).subscribe((data: any) => {
      if (data.success) {
        this.finalcateogryforuser = data.categorie;
        this.suggestedcategory = data.categorie;
        this.finalidcateg = data.categorie.id;
        this.finalcateogryforuser = this.suggestedcategory;
        this.categoryapproved = true;
        this.existingsubcategory = true;
        this.showlistexistcategory = true;
        this.suggestedcategory = data.categorie;
        this.topushcategory = data.categorie;
        this.existingcategory = true;
        this.categservices
          .get_subcategoriesByCategoryid(data.categorie.id)
          .subscribe((res) => {
            this.listsubcategories = res;
            if (this.listsubcategories.length > 0) {
              this.showlistsubcategoriestochange = true;
              this.showlistsubcategoriestochange = true;
              this.showlistexistsubcategory = true;
            }
          });
        this.getcategories();
        Swal.fire(
          'Saved!  ',
          'you can always edit it or delete it',
          'success'
        ).then(() => {});
      } else {
        Swal.fire(data.message, '', 'info');
      }
    });
  }
  subnamefr = '';
  subnameeng = '';
  subnamede = '';
  addnewsubcategory() {
    Swal.fire({
      title: 'Do you want to add this sub_Category?',

      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      const subc: any = {
        name_fr: this.subnamefr,
        name_en: this.subnameeng,
        name_de: this.subnamede,
        category_id: this.finalcateogryforuser.id,
        is_accepted: 0,
      };

      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categservices.addsubcategory(subc).subscribe((data: any) => {
          this.suggestedsubcategory = data.categorie;
          this.topushsubcategory = data.categorie;
          this.existingsubcategory = true;
          this.finalidsubcateg = data.categorie.id;
          this.categservices
            .get_servicesBysubcategoriesid(data.categorie.id)
            .subscribe((sers) => {
              this.listallservicess = sers;
              if (this.listallservicess.length > 0) {
                this.showlistservicess = true;
              }
            });

          this.categservices
            .get_subcategoriesByCategoryid(this.finalcateogryforuser.id)
            .subscribe((res) => {
              this.listsubcategories = res;
              if (this.listsubcategories.length > 0) {
                this.showlistexistsubcategory = true;
                this.showlistsubcategoriestochange = true;
              }
            });
        });
      } else {
        Swal.fire('Category service not saved', '', 'info');
      }
    });
  }
  sernamefr: string;
  sernameen: string;
  sernamede: string;
  addnewservice() {
    Swal.fire({
      title: 'Are you sure ?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var ser: any = {
          name_fr: this.sernamefr,
          name_en: this.sernameen,
          name_de: this.sernamede,
          sub_id: this.finalsubcateogryforuser.id,
        };
        this.categservices.addservicetosub(ser).subscribe((el: any) => {
          Swal.fire(
            'Perfect!',
            'new services has been added .',
            'success'
          ).then((e: any) => {});
        });
      }
    });
  }
  finalcateogryforuser: any;
  finalsubcateogryforuser: any;
  finalservicesforuser: any[] = [];
  approveservice(item, index) {
    this.allservicessuggested[index].approved = true;
    this.finalservicesforuser.push(item);
  }
  rejectservice(item, index) {
    this.allservicessuggested.splice(index, 1);
  }
  savechanges() {
    Swal.fire({
      title: 'Are you sure ?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalservicesforuser.forEach((ser) => {
          var ser: any = {
            name_fr: ser.name_fr,
            name_en: ser.name_en,
            name_de: ser.name_de,

            sub_id: this.finalsubcateogryforuser.id,
          };
          this.categservices.addservicetosub(ser).subscribe((el: any) => {
            this.categservices.getallservices().subscribe((sers) => {
              this.allservicesindatabase = sers.data;
            });
            this.showapproveform = true;
          });
        });
        Swal.fire('Perfect!', 'new services has been added .', 'success').then(
          (e: any) => {}
        );
      }
    });
  }
  showapproveform: boolean = true;
  allservicesindatabase: any[] = [];

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}
  selectedItems = [];
  approveuserrequest() {
    let listsrv: any[] = [];
    this.selectedItems.forEach((e) => {
      listsrv.push(e.id);
    });
  
    if (listsrv.length > 0) {
      if (this.currentrequest.locationId) {
        let locationObj = {
          id: this.currentrequest.locationId,
          services: listsrv,
          still_do: 1,
        };
        this.companyService
          .updateLocationServices(locationObj)
          .subscribe((data) => {});
      } else {
        let obj = {
          distance: 0, //this.distance,
          companyId: this.requester.id,
          title: '',
          city: this.requester.city, //this.cityLocation,
          zip_code: this.requester.zip_code, //this.zipCodeLocation,
          country: this.requester.country,
          state: this.requester.state,
          longitude: this.requester.longitude, //this.longitudeLocation,
          latitude: this.requester.latitude, //this.latitudeLocation,
          is_active: 1,
          services: [],
        };

        this.companyService.addLocation(obj).subscribe((data) => {
          let locationObj = {
            id: data.data.id,
            services: listsrv,
            still_do: 1,
          };
       
          this.companyService
            .updateLocationServices(locationObj)
            .subscribe((data) => {
              let reqobj: any = {
                id: this.currentrequest.id,
                is_accepted: 1,
                is_deleted: 0,
              };
              this.categservices.updaterequest(reqobj).subscribe((e) => {
                this.router.navigateByUrl('/tanduu-admin/sales').then((e) => {
                  window.location.reload();
                });
              });
            });
        });

        
      }
    }
  }
  refuserequest() {
    let reqobj: any = {
      id: this.currentrequest.id,
      is_accepted: 0,
      is_deleted: 1,
    };
    this.categservices.updaterequest(reqobj).subscribe((e) => {
      this.router.navigateByUrl('/tanduu-admin/sales').then((e) => {
        window.location.reload();
      });
    });
  }
}
