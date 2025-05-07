import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BasUrl } from './../../Models/UrlModel';
import { AddCourse } from './../../Models/AddingCourse';
import { MatDialog } from '@angular/material/dialog';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { courseMarkValidator } from '../../Services/courseMarkValidator';
import { englishOnlyValidator } from '../../Services/EnglishValidator';

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
      courseCode: ['', [Validators.required, Validators.minLength(4),Validators.pattern(/^[A-Z]{4}\d{3}$/),englishOnlyValidator,]],
      courseDescription: ['', [Validators.required,englishOnlyValidator,Validators.maxLength(50),Validators.min(5),]],
      course_hours: [2, [Validators.required, Validators.min(2) ,Validators.max(4) ,]],
      course_level: [1, [Validators.required, Validators.min(1) ,Validators.max(4),]],
      course_semster: [1, [Validators.required, Validators.min(1),Validators.max(2),]],
      has_Lab: [false,],
      midTerm: [15, [Validators.required, Validators.min(15),Validators.max(37),]],
      oral: [8, [Validators.required, Validators.min(8),Validators.max(10) ]],
      finalExam: [90, [Validators.required, Validators.min(90) ,Validators .max(120),]],
      lab: [0, [Validators.required, Validators.min(0),Validators.max(50) ]],
      totalMark: [100, [Validators.required, Validators.min(90), Validators.max(200) ]]
    },{
      validators: courseMarkValidator
    }
  );
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
