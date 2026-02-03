import { Component, signal, inject} from '@angular/core';
import { HelloService } from '../../service/hello.service';

@Component({
  selector: 'hello-component',
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {
private helloService = inject(HelloService);

  message = signal<string>('');
  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.helloService.getHello().subscribe({
      next: (val) => {
        this.message.set(val);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to fetch data.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
