import { PagesService } from 'src/app/services/tandu-admin/pages.service';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriesService } from 'src/app/services/categories.service';
import { cpuUsage } from 'process';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categdescs',
  templateUrl: './categdescs.component.html',
  styleUrls: ['./categdescs.component.css']
})
export class CategdescsComponent implements OnInit {
  categories: any[];
  SubCategories: any[];
  id;
  ngSelectValue: any ;
  allcategories:any[]=[]
  constructor(
  
    private categservices: CategoriesService,
    private pagesservice : PagesService
   ) {
    this.categservices.getallcategories().subscribe((res) => {
      this.categories = res;
      this.categories.forEach((e)=>{
   
        let obj : any = {
            id : e.id,
            name : JSON.parse(e.languages).name_en
        }
        this.allcategories.push(obj)
      })
    });
  }
  descen : any ;
  descfr : any ; 
  descde : any ;
  idselected : any ;
  existde: boolean = false;
  existen: boolean = false;
  existfr: boolean = false;
  getValue(e){
    this.descde = "",
    this.descen = "",
    this.descfr = "",
    this.existde = false,
    this.existen  = false,
    this.existfr = false

    this.idselected = e.id
    this.pagesservice.getdescriptionbycategid(e.id).subscribe((d)=>{
 
        if(d.de){
          this.descde = d.de,
          this.existde = true
        }
        if(d.fr){
          this.descfr = d.fr,
          this.existfr = true
        }  if(d.en){
          this.descen = d.en,
          this.existen = true
        }
        

    })
  }
  RemoveValueCatg(){}
  ngOnInit(): void {
   
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',

    toolbarPosition: 'top',
    // toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
 categorySuggestSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  
  updatedescde() {
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
        let obj : any = {
          id : this.idselected,
          fr : this.descfr,
          de : this.descde , 
          en : this.descen

        }
        this.pagesservice.updatedescription(obj).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'description updated',
        }).then((result) => {
       
        });
      }
    });}
  updatedescfr() {
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
        let obj : any = {
          id : this.idselected,
          fr : this.descfr,
          de : this.descde , 
          en : this.descen

        }
        this.pagesservice.updatedescription(obj).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'description  updated',
        }).then((result) => {
        
        });
      }
    });
  }
  updatedescen() {
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
        let obj : any = {
          id : this.idselected,
          fr : this.descfr,
          de : this.descde , 
          en : this.descen

        }
        this.pagesservice.updatedescription(obj).subscribe((p: any) => {});
        Swal.fire({
          icon: 'success',
          title: 'description  updated',
        }).then((result) => {
      
        });
      }
    });
  }
}
