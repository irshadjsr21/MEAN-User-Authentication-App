import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Message } from '../../models/message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user;

  constructor(private usersService: UsersService, private ngFlash: NgFlashMessageService) { }

  ngOnInit() {
    this.usersService.getUserDetails().subscribe(
      result => {
        this.user = result['user'];
        console.log(this.user);
      },
      error => {
        const message = new Message([error.error.msg], true, 4000, 'danger');
        this.ngFlash.showFlashMessage(message);
      }
    );
  }

}
