import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { IAuth } from '../../services/service.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  public doorkeyLen = 0;

  public validating: boolean = false;
  public loginErr: boolean = false;
  public serverErr: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group(
      {
        username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.-]*$")]],
        doorKey: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
      }
    );
  }

  public onSubmit() {
    this.validating = true;
    this.loginErr = false;

    const payload: IAuth = {
      pinOTP: this.loginFormGroup.value['doorKey'],
      username: this.loginFormGroup.value['username']
    };

    this.authService.login(payload)
      .subscribe(
        res => {
          if (res['code'] === '00') {
            localStorage.setItem('cofUser', payload.username);
            localStorage.setItem('token', 'token')

            this.loginErr = false;
            this.validating = false;

            this.router.navigate(['/admin-dashboard'], { queryParams: { page: 'pending', pageNo: '1' } });
          } else {
            this.loginErr = true;
            this.validating = false;
          }
        },
        () => {
          this.loginErr = true;
          this.validating = false;
        }
      );
  }

  public dkChangeHandler(event: Event) {
    this.doorkeyLen = event.target['value']['length'];
  }

}
