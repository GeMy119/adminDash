import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { SponsorFormService } from './services/sponsor-form.service';
import { Router } from '@angular/router';

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
  existingSponsor: any = null; // متغير لتخزين الكفيل الموجود
  isFound: boolean = false;


  constructor(private router: Router, private fb: FormBuilder, private sponsorFormService: SponsorFormService) { }

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
            this.sponsorForm.reset();
            this.showSuccessMessage('Sponsor added successfully');
            this.initForm();
          }
        },
        (error) => {
          if (error.status === 409) {
            this.isFound = true;
            this.existingSponsor = error.error.sponsor;
            this.showSuccessMessage('Sponsor already exists');
            console.log("sponspr", this.existingSponsor)
          } else {
            console.error('Error adding sponsor:', error);
          }
        }
      );
    } else {
      console.log('Form is invalid');
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
  get deviceInfo(): any {
    try {
      const parsedDeviceInfo = JSON.parse(this.existingSponsor.device);
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
  goTosponsorList(): void {
    this.router.navigate(['/sponsor-list']);
  }
}
