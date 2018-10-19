import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '../../models/message';
import { UsersService } from '../../services/users.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private ngFlash: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usersService.loginUser(this.loginForm.value).subscribe(
        result => {
          this.usersService.setToken(result['token']);
          const message = new Message([result['msg']], true, 4000, 'success');
          this.ngFlash.showFlashMessage(message);
          this.router.navigateByUrl('/home');
        },
        error => {
          if (error) {
            const message = new Message([error.error.msg], true, 4000, 'danger');
            this.ngFlash.showFlashMessage(message);
          }
        }
      );
    }
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

}
