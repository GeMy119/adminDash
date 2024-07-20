import { Component, OnInit } from '@angular/core';
import { SponsorService } from './services/sponsor.service';
import { Router } from '@angular/router';
import { Sponsor, Worker } from '../interfaces/sponsor';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {
  sponsors: Sponsor[] = [];
  updatedWorkerData: any = {}; 
  // Define an object to store updated worker data

  pagedUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 20;


  constructor(private sponsorService: SponsorService, private router: Router) { }

  ngOnInit(): void {
    this.getSponsors();
  }
  getSponsors(): void {
    this.sponsorService.getSponsors(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.sponsors = response;
        } else if (response && Array.isArray(response.data)) {
          this.sponsors = response.data;
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
    // Set edit mode for the worker to true
    worker.editMode = true;
  }
  deleteSponsor(id: string): void {
    this.sponsorService.deleteSponsor(id).subscribe(
      (response) => {
        console.log('sponsor deleted successfully:', response);
        this.getSponsors()
      },
      (error) => {
        console.error('Error delete sponsor:', error);
        // Handle error (e.g., display an error message)
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
        this.getSponsors()
      },
      (error) => {
        console.error('Error delete worker:', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
  goToAddSponsor(): void {
    this.router.navigate(['/sponsor-form']);
  }
  saveWorker(sponsorId: string, index: number, worker: Worker): void {
    // Assuming the updatedWorkerData is updated in the component's template
    this.updatedWorkerData = { ...worker }; // Assuming worker properties are directly copied
    this.sponsorService.updateWorkerInSponsor(sponsorId, index, this.updatedWorkerData).subscribe(
      (response) => {
        console.log('Worker updated successfully:', response);
        // Handle success (e.g., display a success message)
        worker.editMode = false; // Disable edit mode after saving
      },
      (error) => {
        console.error('Error updating worker:', error);
        // Handle error (e.g., display an error message)
      }
    );
  }
  goToUpdateSponsor(sponsor: Sponsor): void {
    this.router.navigate(['/update-sponsor-form'], { state: { sponsor: sponsor } });
  }

  setPage(page: number): void {
    // Calculate start and end indexes
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.sponsors.length - 1);

    // Slice users array based on calculated indexes
    this.pagedUsers = this.sponsors.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.setPage(this.currentPage);
  }


}
