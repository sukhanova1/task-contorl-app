import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmPassValidator } from 'src/app/shared/validators/confirm-pass.directive';
import { registerLoaded } from 'src/app/state/user';
import { User } from 'src/app/User';
import * as authSelectors from '../../../state/user/user.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  public registerFormData!: FormGroup;

  serverError$: Observable<string> = this.store$.select(authSelectors.selectServerError);

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.registerFormData = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),

        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),
      },
      [ConfirmPassValidator.Validate('password', 'confirmPassword')]
    );
  }

  register(payload: User) {
    if (this.registerFormData.valid) {
      this.store$.dispatch(registerLoaded({ data: payload }));
      this.registerFormData.reset(this.registerFormData.value);
    }
  }
}
