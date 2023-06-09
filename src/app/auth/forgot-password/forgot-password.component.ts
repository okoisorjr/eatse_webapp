import { Component, OnInit } from '@angular/core';
import { Auth, confirmPasswordReset, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email!: string;
  actionCodeSettings = {
    url: `https://eatse.ng/?email=${this.email}`
  }
  
  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  async sendPasswordResetLink(form: any){
    let result = await sendPasswordResetEmail(this.auth, this.email, this.actionCodeSettings);
    console.log(result);
  }
}
