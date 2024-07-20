import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Sponsor } from 'src/app/interfaces/sponsor';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private apiUrl = environment.apiUrl; // Replace with your API URL
  constructor(private http: HttpClient) { }

  getSponsors(page: number, pageSize: number): Observable<any[]> {
    // Construct the URL with pagination data in the query string
    const url = `${this.apiUrl}/getAllSponsor?page=${page}&size=${pageSize}`;

    // Make HTTP GET request
    return this.http.get<any[]>(url);
  }
  updateWorkerInSponsor(sponsorId: string, index: number, updatedWorkerData: any): Observable<any> {
    const url = `${this.apiUrl}/updateWorker/${sponsorId}/${index}`; // Adjust the URL according to your backend API endpoint
    return this.http.put<any>(url, updatedWorkerData);
  }
  deleteWorkerInSponsor(sponsorId: string, index: number, body: any): Observable<any> {
    const url = `${this.apiUrl}/deleteWorker/${sponsorId}/${index}`; // Adjust the URL according to your backend API endpoint
    return this.http.put<any>(url, body);
  }
  updateSponsor(sponsor: any): Observable<any> {
    // Implement method to update a sponsor on the server
    return this.http.put<any>('your_api_endpoint', sponsor);
  }

  addSponsor(sponsor: any): Observable<any> {
    // Implement method to add a new sponsor to the server
    return this.http.post<any>('your_api_endpoint', sponsor);
  }
  deleteSponsor(sponsorId: string): Observable<any> {
    const url = `${this.apiUrl}/deleteSponsor/${sponsorId}`; // Adjust the URL according to your backend API endpoint
    return this.http.delete<any>(url);
  }
}
