import { BasUrl } from './../../Models/UrlModel';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddCourse } from '../../Models/AddingCourse';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { courseMarkValidator } from '../../Services/courseMarkValidator';
import { englishOnlyValidator } from '../../Services/EnglishValidator';

@Component({
  selector: 'app-course-update',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent implements OnInit {
  CoruseToUpdate: AddCourse = new AddCourse();
  http=inject(HttpClient);
  baseUrl=new BasUrl();
  courseForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

 courseCode:any="";

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private dialog: MatDialog) {
    this.courseForm = this.fb.group({
      courseCode: ['', [Validators.required, Validators.minLength(4),englishOnlyValidator]],
      courseDescription: ['', Validators.required,englishOnlyValidator],
      course_hours: [0, [Validators.required, Validators.min(2) ,Validators.max(4) ]],
      course_level: [0, [Validators.required, Validators.min(1) ,Validators.max(4)]],
      course_semster: [0, [Validators.required, Validators.min(1),Validators.max(2)]],
      has_Lab: [false],
      midTerm: [0, [Validators.required, Validators.min(0)]],
      oral: [0, [Validators.required, Validators.min(0)]],
      finalExam: [0, [Validators.required, Validators.min(0)]],
      lab: [0, [Validators.required, Validators.min(0)]],
      totalMark: [0, [Validators.required, Validators.min(1)]]
    }
    ,{
      validators: courseMarkValidator
    }

  );
  }
  ngOnInit() {
     this.courseCode = this.route.snapshot.paramMap.get('courseCode');
    console.log('Course code:', this.courseCode);
    this.http.get(this.baseUrl.BaseUrl+`/Course/AdminCourseDetails/${this.courseCode}`)
    .subscribe({
      next:(res:any)=>{
        if (res.success){
          this.CoruseToUpdate=res.course;
          // console.log(this.CoruseToUpdate);
          this.courseForm = this.fb.group({
            courseCode: [this.CoruseToUpdate.courseCode, [Validators.required, Validators.pattern(/^[A-Za-z]{4}\d{3}$/),Validators.minLength(4),englishOnlyValidator]],
            courseDescription: [this.CoruseToUpdate.courseDescription, [Validators.required,englishOnlyValidator,Validators.maxLength(50),Validators.min(5)]],
            course_hours: [this.CoruseToUpdate.course_hours, [Validators.required, Validators.min(2) ,Validators.max(4) , ]],
            course_level: [this.CoruseToUpdate.course_level, [Validators.required, Validators.min(1) ,Validators.max(4),]],
            course_semster: [this.CoruseToUpdate.course_semster, [Validators.required, Validators.min(1),Validators.max(2),]],
            has_Lab: [this.CoruseToUpdate.has_Lab ,],
            midTerm: [this.CoruseToUpdate.midTerm, [Validators.required, Validators.min(0),]],
            oral: [this.CoruseToUpdate.oral, [Validators.required, Validators.min(0),]],
            finalExam: [this.CoruseToUpdate.finalExam, [Validators.required, Validators.min(0),]],
            lab: [this.CoruseToUpdate.lab, [Validators.required, Validators.min(0),]],
            totalMark: [this.CoruseToUpdate.totalMark, [Validators.required, Validators.min(1),]]
          },{
            validators: courseMarkValidator
          }
        );
        };
      }

    }
  )

}



UpdateCourseToApi() {
  if (!this.courseCode) {
    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: false,
      data: { message: "Course code is missing!" }
    });
    return;
  }

  this.courseForm.setValidators(courseMarkValidator);
  if (this.courseForm.invalid) {
    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: false,
      data: { message: "Invalid mark distribution for the selected course hours/lab status." }
    });
    return;
  }




  if (this.courseForm.invalid) {
    this.dialog.open(FinalMessageComponent, {
      width: '350px',
      disableClose: false,
      data: { message: "Please correct validation errors before submitting." }
    });
    return;
  }

  const updatedCourse = this.courseForm.value;
  this.isLoading = true;

  this.http.put(`${this.baseUrl.BaseUrl}/Course/update/${this.courseCode}`, updatedCourse).subscribe({
    next: (res: any) => {
      this.isLoading = false;

      this.dialog.open(FinalMessageComponent, {
        width: '350px',
        disableClose: false,
        data: {
          message: res.success ? res.message || "Updated successfully" : "Couldn't update course."
        }
      });

      if (!res.success) console.warn("Update failed:", res);
    },
    error: (err) => {
      this.isLoading = false;
      this.dialog.open(FinalMessageComponent, {
        width: '350px',
        disableClose: false,
        data: {
          message: err.error?.message || "Server error occurred"
        }
      });
      console.error("HTTP Error:", err);
    }
  });

}
}
