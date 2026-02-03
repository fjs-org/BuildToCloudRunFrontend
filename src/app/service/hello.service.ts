import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HelloService {
  private http = inject(HttpClient);
  private url = '/api/hello';

  getHello(): Observable<string> {
    // We use responseType: 'text' if the API returns a simple string
    return this.http.get(this.url, { responseType: 'text' });
  }
}