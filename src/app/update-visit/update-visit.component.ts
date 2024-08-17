import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Visit } from '../interfaces/sponsor';
import { UpdateVisitService } from './service/update-visit-service.service';

@Component({
  selector: 'app-update-visit',
  templateUrl: './update-visit.component.html',
  styleUrls: ['./update-visit.component.css']
})
export class UpdateVisitComponent implements OnInit {
  visit!: Visit;
  updateVisitForm!: FormGroup;
  errorMessage: string | null = null; // For displaying error messages

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private updateVisitService: UpdateVisitService
  ) {
    this.updateVisitForm = this.fb.group({
      visaNo: ['', Validators.required],
      passportNo: ['', Validators.required],
      code: ['', Validators.required],
      applicationNo: ['', Validators.required],
      birthDate: ['', Validators.required],
      name: ['', Validators.required],
      validFrom: ['', Validators.required],
      validUntil: ['', Validators.required],
      typeOfVisa: ['', Validators.required],
      durationOfStay: ['', Validators.required],
      placeOfIssue: ['', Validators.required],
      entryType: ['', Validators.required],
      nationality: ['', Validators.required],
      purpose: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.visit = history.state.visit;
    console.log(this.visit)
    if (!this.visit) {
      console.error('No visit data found in navigation state');
      this.router.navigate(['/visit-list']);
      return;
    }
    this.updateVisitForm.patchValue(this.visit);
  }

  submitForm(): void {
    if (this.updateVisitForm.valid) {
      const updatedVisitData = this.updateVisitForm.value;
      console.log('Form data:', updatedVisitData);
      console.log('Visit ID:', this.visit._id);
      this.updateVisitService.updateVisit(this.visit._id, updatedVisitData).subscribe(
        (response) => {
          console.log('Response from server:', response);
          this.router.navigate(['/visit-list']);
        },
        (error) => {
          console.error('Error from server:', error);
          this.errorMessage = 'حدث خطأ أثناء تحديث التأشيرة. يرجى المحاولة مرة أخرى.';
        }
      );
    } else {
      this.errorMessage = 'يرجى التحقق من صحة جميع الحقول.';
      this.updateVisitForm.markAllAsTouched();
    }
  }


}
