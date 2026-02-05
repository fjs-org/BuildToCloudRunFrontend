import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatPostService {
  private http = inject(HttpClient);
  private url = '/api/chatpost';
  private urlLongPoll = '/api/chatpostlongpoll';

  getChatPostsLongPoll(): Observable<string> {
    return this.http.get(this.urlLongPoll, { responseType: 'text' });
  }

  getChatPosts(): Observable<string> {
    return this.http.get(this.url, { responseType: 'text' });
  }

  sendChatPost(messageText: string): Observable<any> {
    const body = { 
        message: messageText 
    };

    return this.http.post(this.url, body);
  }
  
}