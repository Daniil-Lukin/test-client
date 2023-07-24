import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { passwordRepeatValidator } from 'src/app/core/extensions/password-repat.validator';
import { StorageService } from '../../services/storage-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      passwordRepeat: [
        null,
        Validators.compose([
          Validators.required,
          passwordRepeatValidator('password'),
        ]),
      ],
    });
  }

  submitForm(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.authService
        .registrate(this.email, this.password)
        .subscribe((userData) => {
          this.storageService.setUser(userData.accessToken, true, userData._id);
          this.router.navigate(['home']);
        });
    }
  }

  get userName(): string {
    return this.registrationForm.get('userName')?.value;
  }

  get email(): string {
    return this.registrationForm.get('email')?.value;
  }

  get password(): string {
    return this.registrationForm.get('password')?.value;
  }

  get passwordRepeat() {
    return this.registrationForm.get('password')?.value;
  }
}
