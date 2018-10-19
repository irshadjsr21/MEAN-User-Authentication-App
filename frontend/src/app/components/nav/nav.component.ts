import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Message } from 'src/app/models/message';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public usersService: UsersService, private router: Router, private ngFlash: NgFlashMessageService) { }

  ngOnInit() {
  }

  logout() {
    this.usersService.deleteToken();
    this.router.navigateByUrl('/login');
    const message = new Message(['Logout Successful'], true, 4000, 'success');
    this.ngFlash.showFlashMessage(message);
  }
}
