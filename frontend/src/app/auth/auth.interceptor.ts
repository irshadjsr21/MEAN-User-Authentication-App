import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Message } from '../models/message';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private usersService: UsersService, private router: Router, private ngFlash: NgFlashMessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noAuth')) {
            return next.handle(req.clone());
        } else {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.usersService.getToken())
            });
            return next.handle(cloneReq).pipe(
                tap(
                    result => {

                    },
                    error => {
                        this.router.navigateByUrl('/login');
                        const message = new Message([error.error.msg], true, 4000, 'danger');
                        this.ngFlash.showFlashMessage(message);
                        this.usersService.deleteToken();
                    }
                )
            );
        }
    }
}
