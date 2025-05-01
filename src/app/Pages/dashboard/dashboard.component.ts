import { stats } from './../../Models/Stats';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BasUrl } from '../../Models/UrlModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  reload() {
    console.log('Making API request...');
    this.http.get<any>("https://eduplat123.runasp.net/api/AdminDashBoard/GetStats").subscribe({
      next: (res) => {
        console.log('Response received:', res);
        if (res.success && res.stats) {
          console.log('Stats:', res.stats);
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
    console.log('Making API request on ngOnInit...');
    this.http.get<any>("https://eduplat123.runasp.net/api/AdminDashBoard/GetStats").subscribe({
      next: (res) => {
        console.log('Response received:', res);
        if (res.success && res.stats) {
          console.log('Stats:', res.stats);
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
