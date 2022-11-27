import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UrlsService } from 'src/app/globals/urls-common.service';

UrlsService.backendUrl;
@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  //token: string = JSON.parse(localStorage.getItem('rest')).accessToken;

  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': ' this.token',
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

  // get all invitation sent
  getAllInvitationsSent(sender_id: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/invitations/sent',
      sender_id
    );
  }

  // get all invitation received
  getAllInvitationsReceived(receiver_id: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/invitations/received',
      receiver_id
    );
  }

  // get invitation by key
  getInvtationBykEY(key: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/invitations/single',
      key
    );
  }

  // send invitation to old user
  sentInvitationToExistingUser(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/invitations/sent-to-exist-user',
      data,
      this.httpOptions
    );
  }

  // send invitation to new user
  sentInvitationToNewUser(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/admin/invitations/sent-to-new-user',
      data
    );
  }

  // accept invitation
  acceptInvitation(key: any, success: any): Observable<any> {
    return this.http.get<any>(
      UrlsService.backendUrl +
      '/api/admin/invitations/accept?invitation_key=' +
      key +
      '&status=' +
      success
    );
  }

  // accept invitation
  declineInvitation(key: any, success: any): Observable<any> {
    return this.http.get<any>(
      UrlsService.backendUrl +
      '/api/admin/invitations/accept?invitation_key=' +
      key +
      '&status=' +
      success
    );
  }

  getAllAccess(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/access/getaccess',
      data
    );
  }

  updateAccessForUser(data: any): Observable<any> {
    return this.http.post<any>(
      UrlsService.backendUrl + '/api/access/update',
      data
    );
  }
}
