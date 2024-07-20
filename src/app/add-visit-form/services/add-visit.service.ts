import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AddVisitService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // تعريف الدالة addVisit
  addVisit(visitData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addVisit`, visitData);
  }

  // تعريف الدالة getVisits
  getVisits(currentPage: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllVisits?page=${currentPage}&size=${pageSize}`);
  }

  // تعريف الدالة deleteVisit
  deleteVisit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteVisit/${id}`);
  }
}