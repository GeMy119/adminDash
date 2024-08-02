import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AddVisitService } from './services/add-visit.service';
@Component({
  selector: 'app-add-visit-form',
  templateUrl: './add-visit-form.component.html',
  styleUrls: ['./add-visit-form.component.css']
})
export class AddVisitFormComponent implements OnInit {
  visit: any = {}; // Define a visit object to store form data
  isFound: boolean = false;
  existingVisit: any = null;
  formData: FormData = new FormData();
  selectedImageFile: File | null = null; // Initialize selectedImageFile to null
  constructor(private AddVisitService: AddVisitService, private router: Router) { }

  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedImageFile = file;
  }

  submitForm(): void {
    // Clear any previous formData to avoid appending duplicates
    this.formData = new FormData();

    // Append form data
    this.formData.append('visaNo', this.visit.visaNo);
    this.formData.append('passportNo', this.visit.passportNo);
    this.formData.append('code', this.visit.code);
    this.formData.append('applicationNo', this.visit.applicationNo);
    this.formData.append('birthDate', this.visit.birthDate);
    this.formData.append('name', this.visit.name);
    this.formData.append('validFrom', this.visit.validFrom);
    this.formData.append('validUntil', this.visit.validUntil);
    this.formData.append('typeOfVisa', this.visit.typeOfVisa);
    this.formData.append('durationOfStay', this.visit.durationOfStay);
    this.formData.append('placeOfIssue', this.visit.placeOfIssue);
    this.formData.append('entryType', this.visit.entryType);
    this.formData.append('nationality', this.visit.nationality);
    this.formData.append('purpose', this.visit.purpose);

    // Append the selected image file if it exists
    if (this.selectedImageFile) {
      this.formData.append('image', this.selectedImageFile);
    }

    // Call the addVisit service
    this.AddVisitService.addVisit(this.formData).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.existingVisit = error.error.existingVisit;
          console.log(this.existingVisit)
          this.isFound = true;
          console.error('Error adding visit:', error);
        }
        return throwError(error); // Rethrow the error
      })
    ).subscribe((response: any) => {
      console.log(response);
      // Handle success: clear the form and show an alert message
      this.router.navigate(['/visit-list']);
      // Optionally, navigate to the visit list or another relevant component
    });
  }
  get deviceInfo(): any {
    try {
      const parsedDeviceInfo = JSON.parse(this.existingVisit.device);
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


  // Function to clear the form
  clearForm(): void {
    this.visit = {
      visaNo: '',
      passportNo: '',
      code: '',
      applicationNo: '',
      birthDate: '',
      name: '',
      validFrom: '',
      validUntil: '',
      typeOfVisa: '',
      durationOfStay: '',
      placeOfIssue: '',
      entryType: '',
      nationality: '',
      purpose: ''
    };
    this.selectedImageFile = null;
    this.formData = new FormData();
  }

}
