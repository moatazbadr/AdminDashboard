import { response } from './../../Models/responseModel';
import { BasUrl } from './../../Models/UrlModel';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../Models/Course';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddCourse } from '../../Models/AddingCourse';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponentComponent } from '../../Components/confirm-component/confirm-component.component';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule,RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    router=inject(Router);
  getCourseProfile(courseCode:string) {
    this.router.navigateByUrl(`/Courses/CourseUpdate/${courseCode}`);
  }
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchText: string = '';
  page: number = 1;
  itemsPerPage: number = 8;
  newCourse: AddCourse = new AddCourse();
  http = inject(HttpClient);
  baseUrl=new BasUrl();

  constructor(private dialog: MatDialog) {}
  load_Courses() {
    this.http.get<Course[]>(this.baseUrl.BaseUrl+"/Course/Get-all-courses").subscribe({
      next: (res: Course[]) => {
        this.courses = res;
        this.filteredCourses = res;
      },
      error: (err) => console.log(err)
    });
    console.log(this.courses);
  }

  ngOnInit(): void {
    this.load_Courses();
  }

  searchCourses() {
    this.filteredCourses = this.searchText.trim() === ''
      ? this.courses
      : this.courses.filter(course =>
          course.courseCode.toUpperCase().includes(this.searchText.toUpperCase().trim())
        );

    this.page = 1;
  }


removeCourse(CourseCode: string) {
  const dialogRef = this.dialog.open(ConfirmComponentComponent, {
    width: '350px',
    disableClose: true,
    data: {
      message: `Are you sure you want to remove the course "${CourseCode}"?`
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const options = {
        headers: { 'Content-Type': 'application/json' },
        body: { courseCode: CourseCode } // Wrapped in an object!
      };

      this.http.delete(this.baseUrl.BaseUrl + "/Course/remove-course", options).subscribe({
        next: (res: any) => {
          this.dialog.open(FinalMessageComponent, {
            width: '350px',
            disableClose: false,
            data: {
              message: res.success ? res.message : "Something went wrong"
            }
          });
          this.load_Courses(); // Optionally refresh course list
        },
        error: (err) => {
          this.dialog.open(FinalMessageComponent, {
            width: '350px',
            disableClose: false,
            data: {
              message: "Couldn't delete the course. Check console."
            }
          });
          console.log(err);
        }
      });
    }
  });
}





}
