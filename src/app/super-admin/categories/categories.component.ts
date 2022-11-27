import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';

import { CommonServiceService } from '../../common-service.service';
import { AppComponent } from '../../app.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
import { CategoriesServices } from 'src/app/services/tandu-admin/categories.service';
import { strictEqual } from 'assert';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;
export interface DialogData {
  id: string;
  name: string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CategoriesComponent implements OnInit {
  columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  expandedElement: PeriodicElement | null;
  categories = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name: string = 'Cardiology';
  id;
  @ViewChild('addcategoryimg') demoBasic: ModalDirective;
  key;
  constructor(
    private categoryser: CategoriesServices,
    public dialog: MatDialog,
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private _liveAnnouncer: LiveAnnouncer,
    public router: Router
  ) {
    this.getcategories();
  }
  categs: any[] = [];
  allcategs: any[] = [];
  categsa: any[] = [];
  categsd: any[] = [];
  categsp: any[] = [];
  categoriesfilter:any[]=[]
  getcategories() {
    this.categsa = [];
    this.categsd = [];
    this.categsp = [];
    this.categoryser.getcategories().subscribe((result) => {
      this.categs = result;
      this.categs.forEach((e: any) => {
        e.languages = JSON.parse(e.languages);
      });
      this.allcategs = result;
      this.allcategs.forEach((currentValue, index) => {
        if (currentValue.is_accepted && !currentValue.is_deleted) {
          this.categoriesfilter.push({id:currentValue.id , name : currentValue.languages.name_en})
          this.categsa.push(currentValue);
     
          console.log(currentValue)
        }
        if (!currentValue.is_accepted) {
          this.categsp.push(currentValue);
        }
        if (currentValue.is_deleted && currentValue.is_accepted) {
          this.categsd.push(currentValue);
        }
      });
      this.filtredarraya = this.categsa
    });
  }
  ngOnInit(): void {}
  gotocategorysubs(categ: any) {
    this.router.navigateByUrl('/tanduu-admin/sub-categories?id=' + categ['id']);
  }
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  geCategories() {
    this.commonService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  editModal(template: TemplateRef<any>, category) {
    this.id = category.id;
    this.name = category.name;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, category) {
    this.id = category.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  save() {
    this.modalRef.hide();
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  deleteCategories() {
    this.categs.forEach((currentValue, index) => {
      var categ: any = {
        id: currentValue.id,
        is_deleted: 1,
      };
      this.categoryser.enabledisable(categ).subscribe((result) => {});
    });
  }
  enableCategories() {
    this.categs.forEach((currentValue, index) => {
      var categ: any = {
        id: currentValue.id,
        is_deleted: 0,
      };
      this.categoryser.enabledisable(categ).subscribe((result) => {});
    });
  }

  decline() {
    this.modalRef.hide();
  } //upload images
  //url; //Angular 8
  urlimg: any; //Angular 11, for stricter type
  msg = '';

  //selectFile(event) { //Angular 8
  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.urlimg = reader.result;
    };
  }

  showmodaladdsub() {
    AppComponent.namecategfrommodaloforaddsub = 'Plumbery test';
    AppComponent.idcategfrommodalforaddsub = 1;
    $('#addsubcategory').modal('show');
  }
  async uploadimageforcategory() {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture',
        });
      };
      reader.readAsDataURL(file);
    }
  }
  showmodaladdimgsub() {
    AppComponent.namecategfrommodaloforaddsub = 'Plumbery test';
    AppComponent.idcategfrommodalforaddsub = 1;
    $('#addsubcategoryimg').modal('show');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  disableall() {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        /*return fetch(`//api.github.com/users/${login}`)
         .then((response) => {
           if (!response.ok) {
             throw new Error(response.statusText);
           }
           return response.json();
         })
         .catch((error) => {
           Swal.showValidationMessage(`Request failed: ${error}`);
         });*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategories();
        Swal.fire({
          icon: 'success',
          title: ' All categories are disabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  disablcategory(a: any) {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        var categ: any = {
          id: a.id,
          is_deleted: true,
        };
        this.categoryser.enabledisable(categ).subscribe((result) => {});
        Swal.fire({
          icon: 'success',
          title: 'Category is disabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  enabblecategory(a: any) {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        var categ: any = {
          id: a.id,
          is_deleted: 0,
        };
        this.categoryser.enabledisable(categ).subscribe((result) => {});
        Swal.fire({
          icon: 'success',
          title: 'Category is enabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  acceptcategory(a: any) {
    Swal.fire({
      title: 'enter your security key',
      text: ' the verification code was sent now to your mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        var categ: any = {
          id: a.id,
          is_accepted: 1,
        };
        this.categoryser.acceptcategory(categ).subscribe((result) => {});
        Swal.fire({
          icon: 'success',
          title: 'Category is accepted now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  enableall() {
    Swal.fire({
      title: 'enter your security key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        /*return fetch(`//api.github.com/users/${login}`)
         .then((response) => {
           if (!response.ok) {
             throw new Error(response.statusText);
           }
           return response.json();
         })
         .catch((error) => {
           Swal.showValidationMessage(`Request failed: ${error}`);
         });*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        this.enableCategories();
        Swal.fire({
          icon: 'success',
          title: ' All categories are enabled now',
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  }
  disablecateg() {
    Swal.fire({
      title: 'enter your security key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Disable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        /*return fetch(`//api.github.com/users/${login}`)
         .then((response) => {
           if (!response.ok) {
             throw new Error(response.statusText);
           }
           return response.json();
         })
         .catch((error) => {
           Swal.showValidationMessage(`Request failed: ${error}`);
         });*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Category is disabled now',
          text: 'it wont be shown in tanduu website ',
        });
      }
    });
  }
  enablecateg() {
    Swal.fire({
      title: 'enter your security key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        /*return fetch(`//api.github.com/users/${login}`)
         .then((response) => {
           if (!response.ok) {
             throw new Error(response.statusText);
           }
           return response.json();
         })
         .catch((error) => {
           Swal.showValidationMessage(`Request failed: ${error}`);
         });*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: ' category is enabled now',
          text: 'it will be shown in tanduu website ',
        });
      }
    });
  }
  addcategory() {
    Swal.fire({
      title: 'enter your security key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enable',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        /*return fetch(`//api.github.com/users/${login}`)
         .then((response) => {
           if (!response.ok) {
             throw new Error(response.statusText);
           }
           return response.json();
         })
         .catch((error) => {
           Swal.showValidationMessage(`Request failed: ${error}`);
         });*/
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        $('#addcategory').modal('show');
      } else {
        Swal.fire({
          icon: 'error',
          title: ' Wrong security code',
          text: 'You still have 2 attempts  ',
        });
      }
    });
  }
  nameaa: string;
  categtoedit: any;
  editcateg(template: TemplateRef<any>, categ: any) {
    this.categtoedit = categ;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
    });
  }
  updatecategory() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'category will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryser
          .updatecategory(this.categtoedit)
          .subscribe((element: any) => {
            Swal.fire('Success!', 'Category is now updated.', 'success').then(
              (e: any) => {
                this.ngOnInit();
              }
            );
          });
      }
    });
  }
  showfiltredarray : boolean = false;
  filtredarraya : any[];
  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  dropdownList = [];
  selectedItems = [];
onItemSelect(item: any) {
  this.filtredarraya = this.filtredarraya.filter(object => {
    return object.id == item.id;
});

}
onItemDeSelect(a : any){
  this.filtredarraya = this.categsa
}
onSelectAll(items: any) {
  console.log(items);
}
  editphoto(cat: any) {
    AppComponent.namecategfrommodam = cat['languages'].name_fr;
    AppComponent.idcategtoedit = cat['id'];
    $('#addcategoryimg').modal('show');
  }
  addbanner(cat: any) {
    AppComponent.namecategfrommodam = cat['languages'].name_fr;
    AppComponent.idcategtoedit = cat['id'];
    $('#addbannertocategory').modal('show');
  }
  filtera(a: any) {
    var strs: String = a;
      console.log(a)
    this.categsa = this.categsa.filter((book) =>
      book.languages.name_en.toString().includes(a)
    );
   
  }

  filterd(a: any) {
    this.categsd = this.categsd.filter((book) =>
      book['name'].toString().includes(a)
    );
    if (this.categsd.length == 0) {
      this.getcategories();
    }
  }

  filterp(a: any) {
    this.categsp = this.categsp.filter((book) =>
      book['name'].toString().includes(a)
    );
    if (this.categsp.length == 0) {
      this.getcategories();
    }
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
