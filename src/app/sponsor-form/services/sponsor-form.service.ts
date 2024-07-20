import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sponsor } from 'src/app/interfaces/sponsor'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorFormService {
  private apiUrl = environment.apiUrl; // Your API endpoint URL

  constructor(private http: HttpClient) { }

  // Add a new sponsor
  addSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(`${this.apiUrl}/addSponsor`, sponsor)
      .pipe(
        catchError(error => {
          console.error('Error adding sponsor:', error);
          return throwError(error);
        })
      );
  }

  // Update a sponsor
  updateSponsor(sponsorId: string, updatedSponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.apiUrl}/updateSponsor/${sponsorId}`, updatedSponsor)
      .pipe(
        catchError(error => {
          console.error('Error updating sponsor:', error);
          return throwError(error);
        })
      );
  }

  // Delete a sponsor
  deleteSponsor(sponsorId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteSponsor/${sponsorId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting sponsor:', error);
          return throwError(error);
        })
      );
  }
}
