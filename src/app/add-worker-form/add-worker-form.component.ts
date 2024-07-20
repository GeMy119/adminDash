import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sponsor } from '../interfaces/sponsor';
import { AddWorkerService } from './services/add-worker.service';

@Component({
  selector: 'app-add-worker-form',
  templateUrl: './add-worker-form.component.html',
  styleUrls: ['./add-worker-form.component.css']
})
export class AddWorkerFormComponent implements OnInit {
  sponsor!: Sponsor;
  workerForm: FormGroup;

  constructor(private fb: FormBuilder, private AddWorkerService: AddWorkerService) {
    this.workerForm = this.fb.group({
      workers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Initially, let's add one empty worker form
    this.sponsor = history.state.sponsor;
    this.addNewWorker();
  }

  get workerForms(): FormArray {
    return this.workerForm.get('workers') as FormArray;
  }

  createWorkerForm(): FormGroup {
    return this.fb.group({
      workerName: ['', Validators.required],
      residencyNumber: ['', Validators.required],
      typeOfConsent: ['', Validators.required],
      nationality: ['', Validators.required],
      occupation: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  addNewWorker(): void {
    this.workerForms.push(this.createWorkerForm());
  }

  onSubmit() {
    if (this.workerForm.valid) {
      const workers = this.workerForm.value.workers;
      console.log(workers)
      this.AddWorkerService.pushNewWorkerToSponsor(this.sponsor.sponsorId, workers)
        .subscribe(
          (response) => {
            console.log('New worker added successfully:', response);
            // Clear the form after successful submission
            this.workerForms.clear()
            this.workerForm.reset();
            this.addNewWorker()
          },
          (error) => {
            console.error('Error adding new worker:', error);
            // Handle error
          }
        );
    } else {
      // Form is invalid, display error messages or handle accordingly
    }

  }
}