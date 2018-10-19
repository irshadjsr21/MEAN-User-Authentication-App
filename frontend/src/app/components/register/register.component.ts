import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { Message } from '../../models/message';
import { UsersService } from '../../services/users.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router,
     private ngFlash: NgFlashMessageService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usersService.registerUser(this.registerForm.value).subscribe(
        result => {
          const message = new Message([result['msg']], true, 4000, 'success');
          this.ngFlash.showFlashMessage(message);
          this.router.navigateByUrl('/login');
        },
        error => {
          if (error) {
            const message = new Message([error.error.msg], true, 4000, 'danger');
            this.ngFlash.showFlashMessage(message);
          }
        }
      );
    }
    this.registerForm.reset();
  }

  get f() { return this.registerForm.controls; }
}
