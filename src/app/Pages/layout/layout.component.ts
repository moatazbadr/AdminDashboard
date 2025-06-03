import { BasUrl } from './../../Models/UrlModel';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { LogoutConfirmComponent } from '../../Components/logout-confirm/logout-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import {Analytics} from "@vercel/analytics/next"
@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  http=inject(HttpClient);
  router=inject(Router);
baseUrl=new BasUrl();

  ngOnInit(): void {
    this.GetProfile();
    this.getDashboard();
  }

  AdminUser= {
    'email':'',
    'userName':''
  }
  constructor(private dialog: MatDialog) {}
GetProfile() {
  this.http.get(this.baseUrl.BaseUrl + "/Profile/Profile").subscribe(
    (res: any) => {
      console.log("API Response:", res); // Log the entire response
      if (res.success == true) {
        this.AdminUser.userName = res.userData.userName;
        this.AdminUser.email = res.userData.email;
      } else {
        alert("Error fetching: " + res.message); // Show the server's error message
      }
    },
    (err) => {
      console.error("HTTP Error:", err); // Log detailed HTTP errors
      alert("HTTP request failed. Check console.");
    }
  );
}

  getLogoImagePath(){
    return "../../../assets/200544_eee.png"
  }

  getLogoImagePath2(){
    return "../../../assets/R.png"
  }

  getCourses(){
    if (localStorage.getItem("token")?.toString().length!=0){
    this.router.navigateByUrl('/Courses');
  }
  else{
    return
  }
  }
  getDoctors(){
    this.router.navigateByUrl('/Doctors');
  }
  getDashboard(){
    this.router.navigateByUrl('/dashboard');
  }
  getStudents() {
  this.router.navigateByUrl('/Student');
  }

  getmManageCourses() {

    this.router.navigateByUrl('/manageCourses');
  }


  getRegisterCourse(){
    this.router.navigateByUrl('/registerdoctor')
  }
  getuploadfile(){
    this.router.navigateByUrl('/uploadfile')
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, {
      width: '350px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post(`${this.baseUrl.BaseUrl}/Accounts/logout`, {}).subscribe({
          next: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            console.error('Logout error:', err);
            alert('Logout failed. Try again.');
          }
        });
      }
    });
  }

}
