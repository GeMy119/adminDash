// add-worker-form.component.ts
import { Component, OnInit } from '@angular/core';
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
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private addWorkerService: AddWorkerService) {
    this.workerForm = this.fb.group({
      workers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.sponsor = history.state.sponsor;
    this.addNewWorker();
  }

  get workerForms(): FormArray {
    return this.workerForm.get('workers') as FormArray;
  }

  createWorkerForm(): FormGroup {
    return this.fb.group({
      workerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      residencyNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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
      this.addWorkerService.pushNewWorkerToSponsor(this.sponsor.sponsorId, workers)
        .subscribe(
          (response) => {
            console.log('New worker added successfully:', response);
            this.workerForms.clear();
            this.workerForm.reset();
            this.addNewWorker();
          },
          (error) => {
            console.error('Error adding new worker:', error);
            this.errorMessage = 'حدث خطأ أثناء إضافة العامل الجديد. يرجى المحاولة مرة أخرى.';
          }
        );
    } else {
      this.errorMessage = 'الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.';
    }
  }
}
