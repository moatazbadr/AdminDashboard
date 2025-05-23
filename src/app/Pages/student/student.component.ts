import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BasUrl } from '../../Models/UrlModel';
import { UsersService } from '../../Services/UsersService';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponentComponent } from '../../Components/confirm-component/confirm-component.component';

interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  profilePicture?: string | null;
  joinedDate: string;
}

@Component({
  selector: 'app-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = []; // Stores users shown per page
  usersCount: number = 0;
  baseurl = new BasUrl();
  http = inject(HttpClient);

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private usersService: UsersService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getUsersByType('students');
  }

  getUsersByType(type: string): void {
    this.usersService.getUsersByType(type).subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
          this.usersCount = response.usersCount;
          this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
          this.updateDisplayedUsers();
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedUsers = this.users.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  RemoveStudent(userId: string) {
    if (userId.trim() === '') {
          alert('No Student to delete');
          return;
        }

        const dialogRef = this.dialog.open(ConfirmComponentComponent, {
          width: '350px',
          disableClose: true,
          data: {
            message: `Are you sure you want to remove this Student ?`
          }
        });
        dialogRef.afterClosed().subscribe(result=>{
            if (result){

              this.http.delete(this.baseurl.BaseUrl + '/AdminDashBoard/DeleteStudent', {
                params: { userId: userId }
              }).subscribe({
                next: (res: any) => {
                  if (res.success===true) {
                    this.dialog.open(FinalMessageComponent,{
                      width:'350px',
                      disableClose:false,
                      data :{
                        message :  res.message
                      }}
                    );
                    this.getUsersByType('students');
                  } else {
                    this.dialog.open(FinalMessageComponent,{
                      width:'350px',
                      disableClose:false,
                      data :{
                        message :  res.message
                      }}
                    );
                  }
                },
                error: (err) => {
                  this.dialog.open(FinalMessageComponent,{
                    width:'350px',
                    disableClose:false,
                    data :{
                      message :  "Fatel Error Check Console"
                    }}
                  );
                  console.error(err);
                }
              });
            }


        },)
  }
}
