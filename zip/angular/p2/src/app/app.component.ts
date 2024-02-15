import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'p2';
  a=0;
  b=0;
  c=0;
  add()
  {
    this.c=this.a+this.b;
  }

}