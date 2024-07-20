import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateSponsorService {
  private apiUrl = environment.apiUrl; // Replace with your API URL

  constructor(private http: HttpClient) { }

  updateSposor(id: string, sponsorData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/updateSponsor/${id}`; // Replace with your update user endpoint
    return this.http.put(updateUrl, sponsorData);
  }
}
