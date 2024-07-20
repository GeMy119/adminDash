import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup; // Define the loginForm property
  data: any

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    // Initialize the loginForm FormGroup
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value; // Get username and password from form
      // console.log(this.loginForm.value)
      this.authService.login(userName, password)
        .subscribe(
          (response) => {
            // Upon successful authentication:
            if (response.message === "Welcome") {
              // console.log(response.message)
              this.authService.isAuthenticated = true;
              // console.log(this.authService.isAuthenticatedUser())
              // Redirect to the desired route after login
              this.router.navigate(['/user-list']);
            }
          },
          (error) => {
            console.error('Login failed:', error);
            // Handle login failure, e.g., show error message to the user
          }
        );
      ;
      // console.log(this.authService.login(userName, password))
      // if (this.data) {
      //   this.isAuthenticated = true
      //   this.router.navigate(['/user-list']);
      // } else {
      //   console.error('Authentication failed');
      // }
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
