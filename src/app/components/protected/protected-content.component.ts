import { Component } from '@angular/core';
import { HelloComponent } from '../hello/hello.component';

@Component({
  selector: 'app-protected-content',
  standalone: true,
  imports: [HelloComponent],
  template: `
  <hello-component></hello-component>  
  `,
  styles: '',
})
export class ProtectedContentComponent {}
