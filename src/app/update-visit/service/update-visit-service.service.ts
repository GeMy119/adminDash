import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UpdateVisitService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateVisit(id: string, visitData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/updateVisit/${id}`; // Replace with your update user endpoint
    return this.http.put(updateUrl, visitData);
  }
}
