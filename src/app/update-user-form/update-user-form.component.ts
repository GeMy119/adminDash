import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateServiceService } from './services/update-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {
  userForm: FormGroup;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private updateService: UpdateServiceService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      IdNumber: ['', Validators.required],
      outgoingNumber: ['', Validators.required],
      transactionNumber: ['', Validators.required],
      userOccupation: ['', Validators.required],
      userSerialNumber: ['', Validators.required],
      name: ['', Validators.required],
      releaseDate: ['', Validators.required],
      dateBoking: ['', Validators.required],
      WifeSerialNumber: ['', Validators.required],
      wifeName: ['', Validators.required],
      type: ['', Validators.required],
      condition: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user = history.state.user;
    this.userForm.patchValue(this.user);
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      this.updateService.updateUser(updatedUserData, this.user._id).subscribe(
        response => {
          console.log('User updated successfully:', response);
          if (response.data) {
            this.router.navigate(['/user-list']);
          }
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      // Handle form validation errors
      Object.keys(this.userForm.controls).forEach(field => {
        const control = this.userForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
