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
import { courseCodeLevelSemesterValidator } from '../../Services/courseCodeLevelSemesterValidator';

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
 labOptions: number[] = [];
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
  this.setupDynamicLogic();
  }
 ngOnInit() {
  this.courseCode = this.route.snapshot.paramMap.get('courseCode');
  console.log('Course code:', this.courseCode);

  this.http.get(this.baseUrl.BaseUrl + `/Course/AdminCourseDetails/${this.courseCode}`).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.CoruseToUpdate = res.course;

        this.courseForm = this.fb.group({
          courseCode: [this.CoruseToUpdate.courseCode, [Validators.required, Validators.pattern(/^[A-Z]{4}\d{3}$/), Validators.minLength(4), englishOnlyValidator]],
          courseDescription: [this.CoruseToUpdate.courseDescription, [Validators.required, englishOnlyValidator, Validators.maxLength(50), Validators.minLength(5)]],
          course_hours: [this.CoruseToUpdate.course_hours, [Validators.required, Validators.min(2), Validators.max(4)]],
          course_level: [this.CoruseToUpdate.course_level, [Validators.required, Validators.min(1), Validators.max(4)]],
          course_semster: [this.CoruseToUpdate.course_semster, [Validators.required, Validators.min(1), Validators.max(2)]],
          has_Lab: [this.CoruseToUpdate.has_Lab],
          midTerm: [this.CoruseToUpdate.midTerm, [Validators.required, Validators.min(15), Validators.max(37)]],
          oral: [this.CoruseToUpdate.oral, [Validators.required, Validators.min(5), Validators.max(10)]],
          finalExam: [this.CoruseToUpdate.finalExam, [Validators.required, Validators.min(70), Validators.max(120)]],
          lab: [this.CoruseToUpdate.lab, [Validators.required, Validators.min(0), Validators.max(50)]],
          totalMark: [this.CoruseToUpdate.totalMark, [Validators.required, Validators.min(100), Validators.max(200)]]
        }, {
          validators: [courseMarkValidator, courseCodeLevelSemesterValidator]
        });

        // 👉 FIX: Reapply all dynamic logic and lab options AFTER the form is rebuilt
        this.setLabOptions(this.courseForm.get('has_Lab')?.value);
        this.setupDynamicLogic();
      }
    },
    error: (err) => {
      console.error('Fetch course failed:', err);
    }
  });
}

     setLabOptions(hasLab: boolean): void {
  this.labOptions = hasLab ? [10,37, 50] : [0];
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

 const updatedCourse = this.courseForm.value;
    this.isLoading = true;

    this.http.put(`${this.baseUrl.BaseUrl}/Course/update/${this.courseCode}`, updatedCourse).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.dialog.open(FinalMessageComponent, {
          width: '350px',
          data: {
            message: res.success ? res.message || 'Course updated successfully.' : 'Could not update course.'
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.dialog.open(FinalMessageComponent, {
          width: '350px',
          data: { message: err.error?.message || 'Server error occurred.' }
        });
        console.error('HTTP Error:', err);
      }
    });
  }

  private setupDynamicLogic(): void {
    this.courseForm.get('course_hours')?.valueChanges.subscribe(value => {
      const midTerm = this.courseForm.get('midTerm');
      const oral = this.courseForm.get('oral');
      const finalExam = this.courseForm.get('finalExam');
      const lab = this.courseForm.get('lab');
      const totalMark = this.courseForm.get('totalMark');
      const hasLab = this.courseForm.get('has_Lab');

      switch (+value) {
        case 2:
          midTerm?.setValue(25);
          oral?.setValue(5);
          finalExam?.setValue(70);
          totalMark?.setValue(100);
          hasLab?.setValue(false);
          lab?.setValue(0);
          break;
        case 3:
          midTerm?.setValue(37);
          oral?.setValue(8);
          finalExam?.setValue(105);
          totalMark?.setValue(150);
          hasLab?.setValue(false);
          lab?.setValue(0);
          break;
        case 4:
          midTerm?.setValue(20);
          oral?.setValue(10);
          finalExam?.setValue(120);
          totalMark?.setValue(200);
          hasLab?.setValue(true);
          lab?.setValue(50);
          break;
        default:
          midTerm?.reset();
          oral?.reset();
          finalExam?.reset();
          totalMark?.reset();
          hasLab?.setValue(false);
          lab?.setValue(0);
          break;
      }
    });

    this.courseForm.get('has_Lab')?.valueChanges.subscribe(hasLab => {
      const labControl = this.courseForm.get('lab');
      labControl?.setValue(hasLab ? 10 : 0);
    });

    ['midTerm', 'oral', 'lab', 'finalExam', 'totalMark', 'course_hours'].forEach(field => {
      this.courseForm.get(field)?.valueChanges.subscribe(() => {
        this.courseForm.get('totalMark')?.updateValueAndValidity();
      });
    });
  }
}
