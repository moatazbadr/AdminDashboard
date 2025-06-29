import { MatDialog } from '@angular/material/dialog';
import { stats } from './../../Models/Stats';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BasUrl } from '../../Models/UrlModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../Components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  http:HttpClient=inject(HttpClient);
  eduplatStats=new stats();
  baseUrl=new BasUrl();
 constructor(private dialog:MatDialog) { }

  reload() {
    const loadingRef = this.dialog.open(LoadingComponent, {
        width: '300px',
        disableClose: true
      });
    console.log('Making API request...');
    this.http.get<any>(this.baseUrl.BaseUrl+"/AdminDashBoard/GetStats").subscribe({
      next: (res) => {
         loadingRef.close();
        console.log('Response received:', res);
        if (res.success && res.stats) {
        //  console.log('Stats:', res.stats);
          this.eduplatStats = res.stats;
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => {
        console.error('API request failed:', err);
      }
    });
  }

  ngOnInit(): void {
    const loadingRef = this.dialog.open(LoadingComponent, {
        width: '300px',
        disableClose: true
      });
    this.http.get<any>(this.baseUrl.BaseUrl+"/AdminDashBoard/GetStats").subscribe({
      next: (res) => {
         loadingRef.close();
        console.log('Response received:', res);
        if (res.success && res.stats) {
          //console.log('Stats:', res.stats);
          this.eduplatStats = res.stats;
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => {
        console.error('API request failed:', err);
      }
    });
  }
}
