import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddWorkerService {
  private apiUrl = environment.apiUrl ;// Your API endpoint URL

  constructor(private http: HttpClient) { }

  pushNewWorkerToSponsor(sponsorId: string, workers: any): Observable<any> {
    const url = `${this.apiUrl}/addWorker/${sponsorId}`;
    return this.http.put<any>(url, { workers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
