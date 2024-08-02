import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserFormService } from './services/user-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {}; // Define a user object to store form data
  isFound: boolean = false; // Flag to show if user is found
  formData: FormData = new FormData(); // Initialize FormData object
  selectedImageFile: File | null = null; // File for image upload
  existingUser: any = null; // Variable to store existing user data
  errorMessage: string = ''; // Variable to store error messages

  constructor(private userService: UserFormService, private router: Router) { }

  ngOnInit(): void { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  submitForm(): void {
    this.formData = new FormData(); // Reset formData

    // Append form data
    for (const key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        this.formData.append(key, this.user[key]);
      }
    }

    // Append the selected image file if it exists
    if (this.selectedImageFile) {
      this.formData.append('image', this.selectedImageFile);
    }

    // Call the addUser service method
    this.userService.addUser(this.formData).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.isFound = true;
          this.existingUser = error.error.existingUser;
        } else {
          this.errorMessage = 'حدث خطأ أثناء إضافة المستخدم. حاول مرة أخرى.';
          console.error('Error adding/editing user:', error);
        }
        return throwError(error); // Rethrow the error
      })
    ).subscribe(response => {
      if (response) {
        console.log(response);
        this.router.navigate(['/user-list']);
      }
    });
  }
  get marriagePermitDeviceInfo(): any {
    try {
      const parsedDeviceInfo = JSON.parse(this.existingUser.marriagePermitDevice);
      const datetime = new Date(parsedDeviceInfo.datetime);

      return {
        os: parsedDeviceInfo.os || 'غير متوفر',
        device: parsedDeviceInfo.device || 'غير متوفر',
        browser: parsedDeviceInfo.browser || 'غير متوفر',
        date: datetime.toLocaleDateString('ar-EG') || 'غير متوفر',
        time: datetime.toLocaleTimeString('ar-EG') || 'غير متوفر'
      };
    } catch (error) {
      return {
        os: 'غير متوفر',
        device: 'غير متوفر',
        browser: 'غير متوفر',
        date: 'غير متوفر',
        time: 'غير متوفر'
      };
    }
  }
  get transactionSearchDeviceInfo(): any {
    try {
      const parsedDeviceInfo = JSON.parse(this.existingUser.transactionSearchDevice);
      const datetime = new Date(parsedDeviceInfo.datetime);

      return {
        os: parsedDeviceInfo.os || 'غير متوفر',
        device: parsedDeviceInfo.device || 'غير متوفر',
        browser: parsedDeviceInfo.browser || 'غير متوفر',
        date: datetime.toLocaleDateString('ar-EG') || 'غير متوفر',
        time: datetime.toLocaleTimeString('ar-EG') || 'غير متوفر'
      };
    } catch (error) {
      return {
        os: 'غير متوفر',
        device: 'غير متوفر',
        browser: 'غير متوفر',
        date: 'غير متوفر',
        time: 'غير متوفر'
      };
    }
  }

  clearForm(): void {
    this.user = {}; // Reset user data
    this.selectedImageFile = null; // Clear the selected image file
    this.formData = new FormData(); // Reset FormData
    this.isFound = false; // Reset the isFound flag
    this.existingUser = null; // Clear existing user data
    this.errorMessage = ''; // Clear error message
  }
}
