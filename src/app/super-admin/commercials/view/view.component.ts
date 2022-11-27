import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import * as $ from 'jquery';
import { CommercialsService } from '../../../services/tandu-admin/commercials.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  speciality = [];
  modalRef: BsModalRef;
  errorMessage: string;
  fname;
  lname;
  email;
  phone;
  provision;
  pemail;
  password;
  code;
  id;
  key;
  showFilterRow: boolean = true;
  currentFilter: any;
  serviceLang: any = 'name_' + localStorage.getItem('language');
  headerTable: any = {
    columns1: {
      name_en: 'Customer',
      name_fr: 'Client',
      name_de: 'Kunden',
    },
    columns2: {
      name_en: 'Company name',
      name_fr: "Nom de l'entreprise",
      name_de: 'Name der Firma',
    },
    columns3: {
      name_en: 'City',
      name_fr: 'Ville',
      name_de: 'Stadt',
    },
    columns4: {
      name_en: 'Country',
      name_fr: 'Pay',
      name_de: 'Land',
    },
    columns5: {
      name_en: 'Subscription date',
      name_fr: 'Date de souscription',
      name_de: 'Abonnementdatum',
    },
    emptyTable: {
      name_en: 'No clients found',
      name_fr: 'Aucun client trouvé',
      name_de: 'Keine Kunden gefunden',
    },
    placeholderSearch: {
      name_en: 'search...',
      name_fr: 'chercher...',
      name_de: 'Suche...',
    },
  };
  constructor(
    private commerser: CommercialsService,
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private compserb: CompanyService
  ) {}
  onKey(event: any) {
    // without type info

    this.password = 'Com' + this.fname[0] + this.lname[0] + '123';
    this.code =
      this.fname[0] +
      'PC' +
      Math.floor(Math.random() * 99).toString() +
      this.lname[0];
  }
  ngOnInit(): void {
    this.getSpecialityList();
  }
  allcommercials: any[];
  getSpecialityList() {
    this.commerser.getallcommercials().subscribe((data: any[]) => {
      this.allcommercials = data;
    });
  }
  clients:any[]=[];
  clientsobj: any[] = [];finalobj: any[] = [];
  showcommdata :boolean = false;
  curcom : string = ''
  getclients(id , bl) {
    this.curcom  =  bl.user.first_name +" "+ bl.user.last_name 
    this.clients=[];
    this.clientsobj = []
      this.finalobj= []
    this.commerser
      .getcommercialbucommid(id)
      .subscribe((datacom: any) => {
        this.clients = datacom;
        this.clients.forEach((element) => {
          element.client = JSON.parse(element.client);
        
          this.clientsobj.push({
            id: element.client.user.id,
            name:
              element.client.user.first_name +
              ' ' +
              element.client.user.last_name,
          });
  

        
        });
        this.clientsobj.forEach((objc) => {
          this.compserb.getcompaniesbyuserid(objc.id).subscribe((e: any) => {
            objc['companies'] = e;
            e.forEach((element) => {
              let obj: any = {
                ID: element.id,
                CompanyName: element.company_name,
                user: objc.name,
                City: element.city,
                Country: element.country,
                createdAt: element.createdAt,
                Phone: element.phone,
                proflink:  'https://tanduu.com/' + element.company_link
              };
              this.finalobj.push(obj);
              this.showcommdata = true
            });
          });
        });
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    // this.name = "";
    // this.id = "";
    // this.key = "";
  }

  editModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    // this.name = data[0].speciality;
    // this.id = data[0].id;
    // this.key = data[0].key;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, special) {
    this.id = special.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }
  disablecomm(comm: any) {
    comm.is_deleted = true;
    this.commerser.updatecommercial(comm).subscribe((data: any[]) => {
      window.location.reload();
    });
  }
  enablecomm(comm: any) {
    comm.is_deleted = false;
    this.commerser.updatecommercial(comm).subscribe((data: any[]) => {
      window.location.reload();
    });
  }
  save() {
    var com: any = {
      email: this.email,
      password: this.password,
      firstname: this.fname,
      lastname: this.lname,
      phone: this.phone,
      code: this.code,
      provision: this.provision,
      personal_email: this.pemail,
    };
    this.commerser.addcommercial(com).subscribe((data: any[]) => {
      window.location.reload();
    });
    // let count = this.speciality.reverse()[0]['key'] + 1;
    // let id = this.speciality.reverse()[0]['id'] + 1
    // let params = {
    //   id : id,
    //   key : count,
    //   speciality : this.name
    // }
    // this.commonService.createSpeciality(params).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // })
    this.modalRef.hide();
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      //speciality: this.name,
    };
    // this.commonService.updateSpeciality(params,this.id).subscribe((data : any[])=>{
    //   this.modalRef.hide();
    //   this.getSpecialityList();
    // });
    this.modalRef.hide();
  }

  deleteSpeciality() {
    this.speciality = this.speciality.filter((a) => a.id !== this.id);
    this.commonService.deleteSpeciality(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getSpecialityList();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }
}
