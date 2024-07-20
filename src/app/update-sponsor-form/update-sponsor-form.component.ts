import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private router: Router, private fb: FormBuilder, private UpdateSponsorService: UpdateSponsorService) { }

  ngOnInit(): void {
    this.sponsor = history.state.sponsor;
    this.initForm();
  }

  initForm(): void {
    this.sponsorForm = this.fb.group({
      sponsorId: [this.sponsor.sponsorId],
      sourceNumber: [this.sponsor.sourceNumber],
      name: [this.sponsor.name],
      dateOfLastModification: [this.sponsor.dateOfLastModification],
      // Add other form controls as needed
    });
  }

  onSubmit(): void {
    if (this.sponsorForm.valid) {
      const updatedSponsorData = this.sponsorForm.value;
      console.log(this.sponsor._id)
      this.UpdateSponsorService.updateSposor(this.sponsor._id, updatedSponsorData).subscribe(
        (response) => {
          console.log('Sponsor updated successfully:', response);
          this.router.navigate(['/sponsor-list'])
          // Optionally, you can navigate to a different page or display a success message here
        },
        (error) => {
          console.error('Error updating sponsor:', error);
          // Handle error (e.g., display an error message)
        }
      );
    } else {
      console.log('Form is invalid');
      // Optionally, you can display a validation error message
    }
  }
}
