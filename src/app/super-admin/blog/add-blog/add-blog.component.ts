import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../../common-service.service';
import { SubCategoriesModule } from '../../../sub-categories/sub-categories.module';
import { CategoriesService } from '../../../services/categories.service';
import { TagModel } from 'ngx-chips/core/accessor';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BlogService } from '../../../services/tandu-admin/blog.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare var $: any;
declare var selection: any;
declare var valueKey: any;
@Component({
  selector: 'app-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  blogs: any = [];
  title;
  description: string;
  type;
  modalRef: BsModalRef;
  subcategoryselected: any;
  categoryselected: any;
  blogtitle: string;
  htmlContent;
  blogDetails;
  introduction: string;
  items: any[];
  tags: any[] = [
    { name: 'Alabama' },
    { name: 'Alaska' },
    { name: 'Arizona' },
    { name: 'Arkansas' },
    { name: 'California' },
    { name: 'Colorado' },
    { name: 'Connecticut' },
    { name: 'Delaware' },
    { name: 'Florida' },
    { name: 'Georgia' },
    { name: 'Hawaii' },
    { name: 'Idaho' },
  ];
  name: any;
  itemsAsObjects = [
    { value: 0, name: 'Angular' },
    { value: 1, name: 'React' },
  ];

  onAdding(tag: TagModel): Observable<TagModel> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<TagModel> {
    const confirm = window.confirm(
      'Do you really want to remove this tag?' + tag.name
    );
    return of(tag).pipe(filter(() => confirm));
  }
  languageselected = 'en';
  onChangelng(e) {
    this.languageselected = e;

  }
  categories: any[];
  SubCategories: any[];
  id;
  constructor(
    private blogservice: BlogService,
    private modalService: BsModalService,
    private commonService: CommonServiceService,
    private categservices: CategoriesService
  ) {
    this.categservices.getallcategories().subscribe((res) => {
      this.categories = res;
    });
  }

  ngOnInit() {}
  onChange(deviceValue) {
    this.categservices
      .get_subcategoriesByCategoryid(deviceValue)
      .subscribe((res) => {
        this.SubCategories = res;
      });
  }
  openModal(template: TemplateRef<any>) {
    this.id = '';
    this.title = '';
    this.type = '';
    this.description = '';
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  decline() {
    this.modalRef.hide();
  }

  editModal(template: TemplateRef<any>, blog) {
    let data = blog;
    this.blogDetails = blog;
    this.id = blog['id'];
    this.title = blog['title'];
    this.type = blog['type'];
    this.description = blog['description'];

    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, blog) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteBlog() {
    this.commonService.deleteBlog(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getBlogs();
    });
  }

  update() {
    let params = {
      id: this.id,
      title: this.blogDetails.title,
      description: this.blogDetails.description,
      createdBy: 'Dr. Deborah Angel',
      createdAt: new Date(),
      comments: 0,
      type: this.type,
      status: 'active',
    };
    this.commonService.updateBlog(params, this.id).subscribe((data: any[]) => {
      this.getBlogs();
      this.modalRef.hide();
    });
  }

  save() {
    let params = {
      id: this.blogs.length + 1,
      title: this.title,
      description: this.description,
      createdBy: 'Dr. Deborah Angel',
      createdAt: new Date(),
      comments: '',
      type: this.type,
      status: 'active',
    };
    this.commonService.createBlogs(params).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getBlogs();
    });
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }
  //url; //Angular 8
  url: any; //Angular 11, for stricter type
  msg = '';
  fileToUpload: File;
  //selectFile(event) { //Angular 8
  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.fileToUpload = event.target.files[0];
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }
  submitaddblog() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this blog post will be shared!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var a: any = {
          id: 9,
          first_name: 'Haifa',
          last: 'Jarray',
          about:
            "As a part of Tanduu community, I'm delighted to be providing you with several interesting articles to read about, treating many topics that you, dear readers, definitely will enjoy.",
        };

        var posts: any = {
          author: a,
          title: this.blogtitle,
          description: this.description,
          hashtags: this.items,
          subCategoryId: this.subcategoryselected,
          categoryId: this.categoryselected,
          is_deleted: false,
          introduction: this.introduction,
          languages: this.languageselected,
        };

        this.blogservice.addblog(posts).subscribe((data: any) => {
          const formData = new FormData();
          formData.append(
            'file',
            this.fileToUpload,
            data.categorie.id + '.jpg'
          );

          this.blogservice
            .uploadforumattachement(formData)
            .subscribe((element: any) => {});
        });
        Swal.fire('added!', 'Your blog post  has been added.', 'success');
        // window.location.reload();
      }
    });
  }

  onTagsChanged(input: any) {}
  removeLastOnBackspace() {}
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
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
}
