import { BasUrl } from './../../Models/UrlModel';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  getImagePath() {
    return "../../../assets/EduPlat_logo.png";
  };
  constructor(private dialog: MatDialog) {}
  AdminUser = {
    "email": "",
    "password": ""
  };
  showPassword :boolean=false;

  baseurl = new BasUrl();
  http = inject(HttpClient);
  router = inject(Router);

  OnLogin() {
    this.http.post(this.baseurl.BaseUrl+"/Accounts/Login", this.AdminUser)
      .subscribe((res: any) => {
        if (res.success === false) {
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message : res.message ? res.message :"fatel error check Console"
            }}
          );
          console.log(res.message);
          return;
        }
        if (res.token && res.roles[0] === 'Admin') {
          const expiresIn = 60*60 * 1000;
          const expirationTime = new Date().getTime() + expiresIn;
          localStorage.setItem('token', res.userData.token);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
          this.startAutoLogout(expiresIn);

          this.router.navigateByUrl('/dashboard');
        } else {
          alert("Invalid email or password");
        }
      });
  }

  startAutoLogout(expirationTime: number) {
    setTimeout(() => {
      this.logout();
      this.message();
    }, expirationTime);
  }
  message(){
    this.dialog.open(FinalMessageComponent,{
      width:'350px',
      disableClose:false,
      data :{
        message :  "your session has expired"
      }}
    );
  }

  logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        this.http.post(`${this.baseurl.BaseUrl}/Accounts/logout`, {}).subscribe({
          next: () => {
            this.dialog.open(FinalMessageComponent,{
              width:'350px',
              disableClose:false,
              data :{
                message :  "Logout successfully"
              }});
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            console.error('Logout error:', err);
            alert('Logout failed. Try again.');
          }
        });
        this.router.navigateByUrl('/login');

      }


}
