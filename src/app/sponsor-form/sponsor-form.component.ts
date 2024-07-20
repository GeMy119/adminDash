import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { SponsorFormService } from './services/sponsor-form.service';
import { Router } from '@angular/router';
// import moment from 'moment-hijri';

import { Sponsor } from '../interfaces/sponsor';


@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.css']
})
export class SponsorFormComponent implements OnInit {
  sponsorForm: any; // تعيين قيمة ابتدائية
  successMessage: string = '';
  showMessage: boolean = false;
  hijriDate: string = '';


  constructor(private router: Router, private fb: FormBuilder, private sponsorFormService: SponsorFormService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.sponsorForm = this.fb.group({
      sponsorId: new FormControl('', Validators.required),
      sourceNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      dateOfLastModification: new FormControl('', Validators.required),
      workers: this.fb.array([
        this.createWorker()
      ])
    });
  }

  createWorker(): any {
    return this.fb.group({
      workerName: new FormControl('', Validators.required),
      residencyNumber: new FormControl('', Validators.required),
      typeOfConsent: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
  }

  get workerControls() {
    return (this.sponsorForm.get('workers') as FormArray).controls;
  }

  addWorker() {
    (this.sponsorForm.get('workers') as FormArray).push(this.createWorker());
  }

  onSubmit() {
    if (this.sponsorForm.valid) {
      const formData = this.sponsorForm.value;
      this.sponsorFormService.addSponsor(formData).subscribe(
        (response) => {
          console.log('Sponsor added successfully:', response);
          if (response) {
            this.sponsorForm.reset()
            this.showSuccessMessage('Sponsor added successfully');
            this.sponsorForm.reset(); // Reset the form
            this.initForm(); // Initialize the form again
          }
          // Handle success, e.g., navigate to another page
        },
        (error) => {
          console.error('Error adding sponsor:', error);
          // Handle error
        }
      );
    } else {
      console.log('Form is invalid');
      // Handle form validation errors
    }
  }
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showMessage = true;
    setTimeout(() => {
      this.successMessage = '';
      this.showMessage = false;
    }, 5000); // 5000 milliseconds = 5 seconds
  }
  goTosponsorList(): void {
    this.router.navigate(['/sponsor-list']);
  }

  // onDateChange(event: any) {
  //   const gregorianDate = event.target.value;
  //   const hijriDate = moment(gregorianDate, 'YYYY-MM-DD').format('iYYYY-iMM-iDD');
  //   this.hijriDate = hijriDate;
  // }
}
