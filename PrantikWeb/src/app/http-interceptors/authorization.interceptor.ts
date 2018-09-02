import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    //const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    /*const authReq = req.clone({
      headers: req.headers.set('Authorization', 'sample-auth-token');
    });*/

    // Shortcut For Auth Token Set

    const authReq = req.clone({ setHeaders: { Authorization: 'sample-auth-token' } });

    return next.handle(req);
  }
}