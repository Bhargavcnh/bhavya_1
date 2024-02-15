import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login: { username: string; password: string }[] = [
    { username: 'admin', password: 'admin@123' },
    { username: 'pranav', password: 'pranav@123' },
  ];
  username: string = '';
  password: string = '';
  isValidate: boolean = false;
  isChecked: boolean = false;
  onSubmit() {
    const isValidate = this.login.some(
      (login) =>
        login.username == this.username && login.password == this.password
    );
    if (isValidate) {
      this.isValidate = true;
      alert('Logged in Succesfully');
    } else {
      this.isValidate = false;
    }
    this.isChecked = true;
  }
}
