import { Component } from '@angular/core';
import { HelloComponent } from '../hello/hello.component';
import { ChatPostComponent } from '../chatpost/chatpost.component';

@Component({
  selector: 'app-protected-content',
  standalone: true,
  imports: [HelloComponent, ChatPostComponent],
  template: `
  <hello-component></hello-component>  

  <chat-post-component></chat-post-component>

  `,
  styles: '',
})
export class ProtectedContentComponent {}
