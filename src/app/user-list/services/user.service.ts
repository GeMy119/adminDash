import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
 

  getUsers(page: number, pageSize: number): Observable<any[]> { 
    const url = `${this.apiUrl}/getAllUsers?page=${page}&size=${pageSize}`;
    
    return this.http.get<any[]>(url);
  }


  deleteUser(id: string): Observable<any[]> { // Assuming your API returns an array of any type
    return this.http.delete<any[]>(`${this.apiUrl}/deleteUser/${id}`);
  }
  // Other methods...
}
