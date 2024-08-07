import { Component, OnInit } from '@angular/core';
import { SponsorService } from './services/sponsor.service';
import { Router } from '@angular/router';
import { Sponsor, Worker } from '../interfaces/sponsor';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {
  sponsors: Sponsor[] = [];
  updatedWorkerData: any = {};
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(private sponsorService: SponsorService, private router: Router) { }

  ngOnInit(): void {
    this.getSponsors(this.currentPage);
  }

  getSponsors(page: number = 1): void {
    this.sponsorService.getSponsors(page, this.itemsPerPage).subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.sponsors = response.data;
          console.log(this.sponsors)
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error loading sponsors:', error);
      }
    );
  }

  editWorker(worker: Worker): void {
    worker.editMode = true;
  }

  deleteSponsor(id: string): void {
    this.sponsorService.deleteSponsor(id).subscribe(
      (response) => {
        console.log('Sponsor deleted successfully:', response);
        this.getSponsors(this.currentPage);
      },
      (error) => {
        console.error('Error deleting sponsor:', error);
      }
    );
  }

  addWorker(sponsor: Sponsor): void {
    this.router.navigate(['/add-worker-form'], { state: { sponsor: sponsor } });
  }

  deleteWorker(sponsorId: string, index: number, worker: Worker): void {
    this.sponsorService.deleteWorkerInSponsor(sponsorId, index, worker).subscribe(
      (response) => {
        console.log('Worker deleted successfully:', response);
        this.getSponsors(this.currentPage);
      },
      (error) => {
        console.error('Error deleting worker:', error);
      }
    );
  }

  goToAddSponsor(): void {
    this.router.navigate(['/sponsor-form']);
  }

  saveWorker(sponsorId: string, index: number, worker: Worker): void {
    this.updatedWorkerData = { ...worker };
    this.sponsorService.updateWorkerInSponsor(sponsorId, index, this.updatedWorkerData).subscribe(
      (response) => {
        console.log('Worker updated successfully:', response);
        worker.editMode = false;
      },
      (error) => {
        console.error('Error updating worker:', error);
      }
    );
  }

  goToUpdateSponsor(sponsor: Sponsor): void {
    this.router.navigate(['/update-sponsor-form'], { state: { sponsor: sponsor } });
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.getSponsors(this.currentPage);
  }
}
