import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModel } from 'ngx-chips/core/accessor';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogService } from 'src/app/services/tandu-admin/blog.service';
import Swal from 'sweetalert2';
declare var $: any;
declare var selection: any;
declare var valueKey: any;
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  categories: any[];
  SubCategories: any[];
  currentcateg;
  s;
  editphoto: boolean = false;
  subcategoryselected: any;
  categoryselected: any;
  blogtitle: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    private categservices: CategoriesService,
    private blogser: BlogService,
    public router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.blogid = params.id;
      this.blogser.getblogbyid(this.blogid).subscribe((blosg: any) => {
        this.blog = blosg;

        this.blog.hashtags = JSON.parse(this.blog.hashtags);
        this.items = this.blog.hashtags;
     
        this.categoryselected = blosg.categoryId;

        this.subcategoryselected = blosg.subCategoryId;

        this.url =
          'https://api.aroundorder.com:1337/blogs/' + blosg.id + '.jpg';
        this.categservices
          .get_subcategoriesByCategoryid(blosg.subCategoryId)
          .subscribe((res) => {
            this.SubCategories = res;
          });
      });
    });
    this.categservices.getallcategories().subscribe((res) => {
      this.categories = res;
    });
  }
  items: any[] = [];
  blogid: number;
  blog: any;
  ngOnInit(): void {
    // { order: "popular" }
    // popular
  }
  onTagsChanged(input: any) {}

  onChange(deviceValue) {
    this.categservices
      .get_subcategoriesByCategoryid(deviceValue)
      .subscribe((res) => {
        this.SubCategories = res;
      });
  }

  removeLastOnBackspace() {}
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
    this.editphoto = true;
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

  updateBlog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this blog post will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var a: any = {
          id: 9,
          first_name: 'Haifa',
          last: 'Jarray',
          about:
            "As a part of Tanduu community, I'm delighted to be providing you with several interesting articles to read about, treating many topics that you, dear readers, definitely will enjoy.",
        };

        (this.blog.author = a), (this.blog.hashtags = this.items);
        this.blog.categoryId = this.categoryselected;
        this.blog.subCategoryId = this.subcategoryselected;

        if (this.editphoto) {
          const formData = new FormData();
          formData.append('file', this.fileToUpload, this.blog.id + '.jpg');

          this.blogser
            .uploadforumattachement(formData)
            .subscribe((element: any) => {
              this.blogser.update(this.blog).subscribe((ss: any) => {
                window.location.reload();
              });
            });
        } else {
          this.blogser.update(this.blog).subscribe((data) => {
            window.location.reload();
          });
        }
        Swal.fire('updated!', 'Your blog post  has been updated.', 'success');
        // window.location.reload();
      }
    });
  }
  updatetags() {
   
    Swal.fire({
      title: 'Are you sure?',
      text: 'this blog tags  will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blog.hashtags = this.items;

        this.blogser.update(this.blog).subscribe((data) => {
          window.location.reload();
        });

        Swal.fire('updated!', 'Your blog post  has been updated.', 'success');
        // window.location.reload();
      }
    });
  }
}
