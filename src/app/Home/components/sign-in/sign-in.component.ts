import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginForm } from '../../core/models/forms/log-in-form';
import { ValidationPattern } from '../../core/validations/validation.pattern';
import { AcceptlogIn } from '../../core/models/login/login';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { ToastrModule } from 'ngx-toastr';
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  // providers: [MessageService, ToastService],
  standalone: true,
  imports:[ LoaderComponent, ButtonModule, CommonModule, ToastModule, ReactiveFormsModule, InputTextModule]
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup<LoginForm> = this.BuildLoginFrom();
  logo = "../../../../assets/images/logo.png"
  isLoading: boolean = false;
  isForgotPaasword: boolean = false;

  constructor(
    private toastService: ToastService,
    public messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  private BuildLoginFrom(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      email: new FormControl<string>('', [Validators.required, Validators.pattern(ValidationPattern.Email)]),
      password: new FormControl<string>('', { validators: [Validators.required] }),
    });
  }

  submit() {
    if (this.isForgotPaasword) {
      this.actionForResetPassword();
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    this.isLoading = true;
    debugger
    if (this.authService.login(email!, password!)) {
      this.isLoading = false;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully logged in.' });
      this.naviagteToDashboard();
    }else{

      this.toastService.error('Invalid email or password');
    }

      this.isLoading = false;
  }

  private naviagteToDashboard() {
    debugger
    return this.router.navigate(['auth/home']);
  }

  ForgotPasswors() {
    this.isForgotPaasword = !this.isForgotPaasword

  }

  private actionForResetPassword(): void {
    const email = this.loginForm.get('email')?.value;

    if (email !== AcceptlogIn.acceptEmail) {
      this.toastService.error('Please enter a valid email');
      return;
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset instructions sent to your email.' });
  }
}
