import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any[]> { // Assuming your API returns an array of any type
    return this.http.post<any[]>(`${this.apiUrl}/addUser`, user);
  }
}
