import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiClientService } from './services/api-client.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-master';
  constructor(private apiClient:ApiClientService){
    this.apiClient.GET().subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  handleClick(){
    this.apiClient.POST({
      title:'foo',
      body:'bar',
      userId:1
    });
  }
}
