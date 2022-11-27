import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { UrlsService } from 'src/app/globals/urls-common.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apik: string = '';

  constructor(private http: HttpClient) {
    this.apik = localStorage.getItem('sc');
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.apik,
    }),
  };
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
        'x-access-token': this.apik,
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
    var httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.apik,
      }),
    };
    return this.http
      .get<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/blogs',
        httpOptionss
      )
      .pipe(retry(1));
  }
  update(posts: any): Observable<any> {
    return this.http
      .post<any>(
        UrlsService.backendUrl + '/api/tanduu_admin/blogs/edit',
        posts,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
