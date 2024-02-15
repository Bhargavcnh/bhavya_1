import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor() { }

  display()
  {
    alert("in service");
    return(['Web','CN','ML']);
  }
}

