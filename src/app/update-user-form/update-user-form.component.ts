// update-user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      IdNumber: [''],
      outgoingNumber: [''],
      transactionNumber: [''],
      userOccupation: [''],
      userSerialNumber: [''],
      name: [''],
      releaseDate: [''],
      dateBoking: [''],
      WifeSerialNumber: [''],
      wifeName: [''],
      type: [''],
      condition: [''],
      nationality: ['']
    });
  }

  ngOnInit(): void {
    this.user = history.state.user;
    this.userForm.patchValue(this.user);
  }

  submitForm(): void {
    const updatedUserData = this.userForm.value;
    // Call the update service to send updated data to the backend
    this.updateService.updateUser(updatedUserData, this.user._id).subscribe(
      response => {
        console.log('User updated successfully:', response);
        if (response.data) {
          this.router.navigate(['/user-list']);
        }
        // Optionally, navigate to another page or show a success message
      },
      error => {
        console.error('Error updating user:', error);
        // Handle error
      }
    );
  }
}
