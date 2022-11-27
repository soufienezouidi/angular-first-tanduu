import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlsService } from '../globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjQwMDc1MTM3LCJleHAiOjE2NDc4NTExMzd9.OkaaPvzz68ZJCv-WBU8kbiYAkjVY_tPCKNilNYEcodA',
    }),
  };
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  uploadforumattachement(foarmData: FormData) {
    var httpOptionss = {
      headers: new HttpHeaders({
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjQwMDc1MTM3LCJleHAiOjE2NDc4NTExMzd9.OkaaPvzz68ZJCv-WBU8kbiYAkjVY_tPCKNilNYEcodA',
      }),
    };

    return this.http.post<any>(
      UrlsService.backendUrl + '/api/tanduu_admin/blogs/uploadphoto',
      foarmData,
      httpOptionss
    );
  }
  addblog(posts: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/blogs/add',
        posts,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getblogs(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/customers/blogs',

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getblogsbycategory(name: string): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/customers/blogs/categories/' + name,

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getblogbyid(idb: number): Observable<any> {
    var bl: any = {
      blog_id: idb,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/blogs/show-blog',
        bl,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  addcommenttoblog(idb: number, comm: any): Observable<any> {
    var commentdata: any = {
      blog_id: idb,
      comment: comm,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/blog/comment/add',
        commentdata,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallblogcomments(idb: number): Observable<any> {
    var commentdata: any = {
      blog_id: idb,
    };
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/customers/blog/comments',
        commentdata,
        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallshashtags(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/customers/blogs/stats',

        this.httpOptions
      )
      .pipe(retry(1));
  }
  getallcategs(): Observable<any> {
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/customers/blogs/categories',

        this.httpOptions
      )
      .pipe(retry(1));
  }
}
