import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginLoaded } from 'src/app/state/user';
import { User } from '../../../User';
import * as authSelectors from '../../../state/user/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
  
export class LoginComponent implements OnInit {

  public loginFormData!: FormGroup;

  public user$: Observable<any> = this.store$.select(authSelectors.selectUser);

  serverError$: Observable<string> = this.store$.select(authSelectors.selectServerError);

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.loginFormData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(payload: User) {
    if (this.loginFormData.valid) {
      this.store$.dispatch(loginLoaded({ data: payload }));
      this.loginFormData.reset(this.loginFormData.value);
    }
  }
}
