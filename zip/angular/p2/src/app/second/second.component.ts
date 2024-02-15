import { Component } from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {

  courseservice:any;

  constructor(private disp:DisplayService)
  {
    this.courseservice=disp.display();
  }

}
