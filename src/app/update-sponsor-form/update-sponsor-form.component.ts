import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sponsor } from '../interfaces/sponsor';
import { UpdateSponsorService } from './service/update-sponsor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-sponsor-form',
  templateUrl: './update-sponsor-form.component.html',
  styleUrls: ['./update-sponsor-form.component.css']
})
export class UpdateSponsorFormComponent implements OnInit {
  sponsor!: Sponsor;
  sponsorForm!: FormGroup;
  errorMessage: string | null = null; // For displaying error messages

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private updateSponsorService: UpdateSponsorService
  ) { }

  ngOnInit(): void {
    this.sponsor = history.state.sponsor;
    if (!this.sponsor) {
      console.error('No sponsor data found in navigation state');
      this.router.navigate(['/sponsor-list']);
      return;
    }
    this.initForm();
  }

  initForm(): void {
    this.sponsorForm = this.fb.group({
      sponsorId: [
        this.sponsor.sponsorId,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15)
        ]
      ],
      sourceNumber: [
        this.sponsor.sourceNumber,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      name: [
        this.sponsor.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      dateOfLastModification: [
        this.sponsor.dateOfLastModification,
        [
          Validators.required
        ]
      ]
      // Add other form controls with their respective validations
    });
  }

  onSubmit(): void {
    if (this.sponsorForm.valid) {
      const updatedSponsorData = this.sponsorForm.value;
      this.updateSponsorService.updateSposor(this.sponsor._id, updatedSponsorData).subscribe(
        (response) => {
          console.log('Sponsor updated successfully:', response);
          this.router.navigate(['/sponsor-list']);
        },
        (error) => {
          console.error('Error updating sponsor:', error);
          this.errorMessage = 'حدث خطأ أثناء تحديث الكفيل. يرجى المحاولة مرة أخرى.'; // Display user-friendly error message
        }
      );
    } else {
      this.errorMessage = 'يرجى التحقق من صحة جميع الحقول.';

      // Optionally, mark all controls as touched to display validation messages
      this.sponsorForm.markAllAsTouched();
    }
  }
}
