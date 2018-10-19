import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { Message } from '../models/message';
import { UsersService } from '../services/users.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router, private ngFlash: NgFlashMessageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.usersService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        const message = new Message(['Login Required'], true, 4000, 'danger');
        this.ngFlash.showFlashMessage(message);
        this.usersService.deleteToken();
        return false;
      }
    return true;
  }
}
