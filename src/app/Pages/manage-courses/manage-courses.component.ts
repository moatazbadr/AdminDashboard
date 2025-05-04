import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BasUrl } from './../../Models/UrlModel';
import { AddCourse } from './../../Models/AddingCourse';
import { MatDialog } from '@angular/material/dialog';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ManageCoursesComponent {
  courseForm: FormGroup;
  baseurl = new BasUrl();
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient,private dialog: MatDialog) {
    this.courseForm = this.fb.group({
      courseCode: ['', [Validators.required, Validators.minLength(3)]],
      courseDescription: ['', Validators.required],
      course_hours: [0, [Validators.required, Validators.min(2) ,Validators.max(4) ]],
      course_level: [0, [Validators.required, Validators.min(1) ,Validators.max(4)]],
      course_semster: [0, [Validators.required, Validators.min(1),Validators.max(2)]],
      has_Lab: [false],
      midTerm: [0, [Validators.required, Validators.min(0)]],
      oral: [0, [Validators.required, Validators.min(0)]],
      finalExam: [0, [Validators.required, Validators.min(0)]],
      lab: [0, [Validators.required, Validators.min(0)]],
      totalMark: [0, [Validators.required, Validators.min(1)]]
    });
  }


  submitCourseToApi() {
    if (this.courseForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post(`${this.baseurl.BaseUrl}/Course/Add-course`, this.courseForm.value)
      .subscribe({
        next: (res:any) => {
          if (res.success){
          this.isLoading = false;
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message : res.success ? res.message : "Something went wrong"
            }

          })

          this.courseForm.reset();
        }
        this.dialog.open(FinalMessageComponent,{
          width:'350px',
          disableClose:false,
          data :{
            message : res.success===false ? res.message : "lol no"
          }

        })
        this.courseForm.reset();

        },
        error: (err) => {
          this.isLoading = false;
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message :  "Fatel error Check Console"
            }

          })

          console.error(err);
        }
      });
  }
}
