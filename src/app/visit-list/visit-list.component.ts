
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddVisitService } from '../add-visit-form/services/add-visit.service';
import { visit } from '../interfaces/sponsor';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {
  visits: visit[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private AddVisitService: AddVisitService, private router: Router) { }

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.AddVisitService.getVisits(this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.visits = response;
        } else if (response && Array.isArray(response.data)) {
          this.visits = response.data;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error loading visits:', error);
      }
    );
  }

  deleteVisit(id: string): void {
    if (confirm('Are you sure you want to delete this visit?')) {
      this.AddVisitService.deleteVisit(id).subscribe(
        (response: any) => {
          console.log('Visit deleted successfully:', response);
          this.loadVisits(); // Refresh the list
        },
        (error: any) => {
          console.error('Error deleting visit:', error);
        }
      );
    }
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.loadVisits();
  }
}

