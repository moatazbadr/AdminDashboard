import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BasUrl } from './../../Models/UrlModel';
import { AddCourse } from './../../Models/AddingCourse';
import { MatDialog } from '@angular/material/dialog';
import { FinalMessageComponent } from '../../Components/final-message/final-message.component';
import { courseMarkValidator } from '../../Services/courseMarkValidator';
import { englishOnlyValidator } from '../../Services/EnglishValidator';
import { courseCodeLevelSemesterValidator } from '../../Services/courseCodeLevelSemesterValidator';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ManageCoursesComponent implements OnInit{
  courseForm: FormGroup;
  baseurl = new BasUrl();
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient,private dialog: MatDialog) {
    this.courseForm = this.fb.group({
      courseCode: ['', [Validators.required, Validators.minLength(0),Validators.pattern(/^[A-Z]{4}\d{3}$/),englishOnlyValidator,]],
      courseDescription: ['', [Validators.required,englishOnlyValidator,Validators.maxLength(50),Validators.minLength(5),]],
      course_hours: ['', [Validators.required, Validators.min(0) ,Validators.max(4) ,]],
      course_level: ['', [Validators.required, Validators.min(0) ,Validators.max(4),]],
      course_semster: ['', [Validators.required, Validators.min(0),Validators.max(2),]],
      has_Lab: [false,],
      midTerm: [0, [Validators.required, Validators.min(0),Validators.max(37),]],
      oral: [0, [Validators.required, Validators.min(0),Validators.max(10) ]],
      finalExam: [0, [Validators.required, Validators.min(0) ,Validators .max(120),]],
      lab: [0, [Validators.required, Validators.min(0),Validators.max(50) ]],
      totalMark: [0, [Validators.required, Validators.min(0), Validators.max(200) ]]
    },{
      validators: courseMarkValidator,courseCodeLevelSemesterValidator
    }
  );
  }
  labOptions: number[] = [];

  ngOnInit(): void {

this.courseForm.get('course_hours')?.valueChanges.subscribe((value) => {
  const midTermControl = this.courseForm.get('midTerm');
  const oralControl = this.courseForm.get('oral');
  const finalExamControl = this.courseForm.get('finalExam');
  const labControl = this.courseForm.get('lab');
  const totalMarkControl = this.courseForm.get('totalMark');
  const hasLabControl = this.courseForm.get('has_Lab');

  switch (+value) {
    case 2:
      midTermControl?.setValue(25);
      oralControl?.setValue(5);
      finalExamControl?.setValue(70);
      totalMarkControl?.setValue(100);
      hasLabControl?.setValue(false);
      labControl?.setValue(0);
      break;
    case 3:
      midTermControl?.setValue(37);
      oralControl?.setValue(8);
      finalExamControl?.setValue(105);
      totalMarkControl?.setValue(150);
      hasLabControl?.setValue(false);
      labControl?.setValue(0);
      break;
    case 4:
      midTermControl?.setValue(20);
      oralControl?.setValue(10);
      finalExamControl?.setValue(120);
      totalMarkControl?.setValue(200);
      hasLabControl?.setValue(true);
      labControl?.setValue(50);
      break;
    default:
      midTermControl?.reset();
      oralControl?.reset();
      finalExamControl?.reset();
      totalMarkControl?.reset();
      hasLabControl?.setValue(false);
      labControl?.setValue(0);
      break;
  }
});

    this.setLabOptions(this.courseForm.get('has_Lab')?.value);
    this.courseForm.get('has_Lab')?.valueChanges.subscribe((hasLab) => {
    this.setLabOptions(hasLab);
    const labControl = this.courseForm.get('lab');
    labControl?.setValue(hasLab ? 10 : 0);

  });
  const fields = ['midTerm', 'oral', 'lab', 'finalExam', 'totalMark', 'course_hours'];
  fields.forEach(field => {
    this.courseForm.get(field)?.valueChanges.subscribe(() => {
      this.courseForm.get('totalMark')?.updateValueAndValidity();
    });
  });
  }
  setLabOptions(hasLab: boolean): void {
  this.labOptions = hasLab ? [10,37, 50] : [0];
}

resetForm(): void {
  this.courseForm.reset({
    courseCode: '',
    courseDescription: '',
    course_hours: 0,
    course_level: 0,
    course_semster: 0,
    has_Lab: false,
    midTerm: 0,
    oral: 0,
    finalExam: 0,
    lab: 0,
    totalMark: 0
  });


  this.setLabOptions(false);

  this.courseForm.markAsPristine();
  this.courseForm.markAsUntouched();
  this.courseForm.updateValueAndValidity();
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
          if (res.success)  {
          this.isLoading = false;
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message : res.success ? res.message : "Something went wrong"
            }

          })

          //this.courseForm.reset();
          this.resetForm();
        }
        else {

          this.isLoading = false;
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message : res.message ? res.message : "Something went wrong"
            }

          })
          console.error(res.message);
        }
        },
        error: (err) => {
          this.isLoading = false;
          this.dialog.open(FinalMessageComponent,{
            width:'350px',
            disableClose:false,
            data :{
              message :  "Fatel error refresh the page and try again"
            }
          })
          console.error(err);
        }
      });
  }
}
