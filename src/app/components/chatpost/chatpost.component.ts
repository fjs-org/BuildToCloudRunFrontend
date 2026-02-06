import { Component, OnInit, signal, inject } from '@angular/core';
import { ChatPostService } from '../../service/chatpost.service';
import { interval, Subscription, switchMap, startWith } from 'rxjs';
import { AuthService } from '../../service/auth.service';

interface ChatPost {
  id: number;
  from: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

@Component({
  selector: 'chat-post-component',
  templateUrl: './chatpost.component.html',
  styleUrls: ['./chatpost.component.scss']
})
export class ChatPostComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  private chatPostService = inject(ChatPostService);
  
  chatPosts = signal<ChatPost[]>([]);

  private pollingSub?: Subscription;

constructor() {}

  ngOnInit(): void {
    this.loadInitialMessages();
    this.startPolling();
  }

  private loadInitialMessages() {
    this.chatPostService.getChatPosts().subscribe({
        next: (val: string) => {
          // Parse the string into the expected ChatPost array
          const parsedData: ChatPost[] = JSON.parse(val);
          parsedData.map(post => {
            post.isCurrentUser = post.from === this.authService.getCurrentUsersEmail(); // Example logic
          });
          this.chatPosts.set(parsedData); 
        },
        error: (err) => console.error('Failed to load posts:', err)
      });
  }

  private startPolling() {
    console.info('Starting polling for new chat posts for user: ', this.authService.getCurrentUsersEmail());
      this.pollingSub = interval(3000)
        .pipe(
          startWith(5), // Trigger immediately on load
          switchMap(() => this.chatPostService.getChatPostsLongPoll())
        )
        .subscribe({
          next: (val: string) => {
            const parsedData: ChatPost[] = JSON.parse(val);
            // Only update signal if data actually changed to prevent unnecessary re-renders
            if (JSON.stringify(this.chatPosts()) !== JSON.stringify(parsedData)) {  
              parsedData.map(post => {
                post.isCurrentUser = post.from === this.authService.getCurrentUsersEmail(); // Example logic
              });

              this.chatPosts.set(parsedData);
            }
            },
          error: (err) => console.error('Polling error:', err)
        });
    }

  sendMessage(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    this.chatPostService.sendChatPost(message).subscribe({
      next: (savedPost) => {
          this.chatPosts.update(posts => [...posts, savedPost]);
        console.info('Post done', savedPost)
      },
      error: (err) => console.error('Failed to send message', err)
    });
  }

}