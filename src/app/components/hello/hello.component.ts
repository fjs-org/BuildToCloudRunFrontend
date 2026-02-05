import { Component, signal, inject} from '@angular/core';
import { HelloService } from '../../service/hello.service';

interface LoggedInUser {
  message: string;
}

@Component({
  selector: 'hello-component',
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent {
private helloService = inject(HelloService);

  message = signal<LoggedInUser>({ message: '' });
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
        const parsedData: LoggedInUser = JSON.parse(val);
        this.message.set(parsedData);
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
