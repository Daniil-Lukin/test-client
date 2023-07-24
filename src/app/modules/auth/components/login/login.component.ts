import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      remember: [true],
    });
  }

  submitForm(): void {
    this.authForm.markAllAsTouched();
    console.log(this.email, this.password);
    if (this.authForm.valid) {
      console.log(this.email, this.password);
      this.authService.signIn(this.email, this.password).subscribe({
        next: (response) => {
          this.storageService.setUser(
            response.accessToken,
            this.remember,
            response._id
          );
          this.router.navigate(['home']);
        },
      });
    }
  }

  get email() {
    return this.authForm.get('email')?.value;
  }

  get password() {
    return this.authForm.get('password')?.value;
  }

  get remember() {
    return this.authForm.get('remember')?.value;
  }
}
