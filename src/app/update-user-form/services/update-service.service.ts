// update-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateServiceService {
  private apiUrl = environment.apiUrl ;// Replace with your API URL

  constructor(private http: HttpClient) { }

  updateUser(userData: any, id: string): Observable<any> {
    const updateUrl = `${this.apiUrl}/updateUser/${id}`; // Replace with your update user endpoint
    return this.http.put(updateUrl, userData);
  }

  // Add more methods for other update operations as needed
}
