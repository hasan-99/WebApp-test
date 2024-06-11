import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private fakeDataUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

getFakeData(): Observable<any[]> {
  return this.http.get<any[]>(this.fakeDataUrl);
}
}
