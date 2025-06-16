// import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// export const courseMarkValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
//   if (!group || !(group instanceof AbstractControl)) return null;

//   const hours = +group.get('course_hours')?.value;
//   const hasLab = group.get('has_Lab')?.value;

//   const midTerm = +group.get('midTerm')?.value || 0;
//   const oral = +group.get('oral')?.value || 0;
//   const lab = +group.get('lab')?.value || 0;
//   const finalExam = +group.get('finalExam')?.value || 0;
//   const totalMarkControl = group.get('totalMark');
//   const totalMark = +totalMarkControl?.value || 0;

//   let isValid = true;

//   if (hours === 2) {
//     isValid = !hasLab &&
//               midTerm === 25 &&
//               oral === 5 &&
//               lab === 0 &&
//               finalExam === 70 &&
//               totalMark === 100;
//   } else if (hours === 3 && hasLab) {
//     isValid = (midTerm + oral + lab) === 60 &&
//               finalExam === 90 &&
//               totalMark === 150;
//   } else if (hours === 3 && !hasLab) {
//     isValid = midTerm === 37 &&
//               oral === 8 &&
//               lab === 0 &&
//               finalExam === 105 &&
//               totalMark === 150;
//   } else if (hours === 4) {
//     isValid = hasLab &&
//               midTerm === 20 &&
//               oral === 10 &&
//               lab === 50 &&
//               finalExam === 120 &&
//               totalMark === 200;
//   } else {
//     isValid = false;
//   }

//   if (!isValid && totalMarkControl) {
//     totalMarkControl.setErrors({ ...totalMarkControl.errors, invalidCourseMarks: true });
//   } else if (totalMarkControl?.hasError('invalidCourseMarks')) {
//     const errors = { ...totalMarkControl.errors };
//     delete errors['invalidCourseMarks'];
//     totalMarkControl.setErrors(Object.keys(errors).length ? errors : null);
//   }

//   return null;
// };
// import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// export const courseMarkValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
//   if (!group || !(group instanceof AbstractControl)) return null;

//   const get = (name: string) => group.get(name);
//   const toNumber = (value: any) => +value || 0;

//   const hours = toNumber(get('course_hours')?.value);
//   const hasLab = !!get('has_Lab')?.value;

//   const midTerm = toNumber(get('midTerm')?.value);
//   const oral = toNumber(get('oral')?.value);
//   const lab = toNumber(get('lab')?.value);
//   const finalExam = toNumber(get('finalExam')?.value);
//   const totalMark = toNumber(get('totalMark')?.value);

//   const controls = {
//     midTerm: get('midTerm'),
//     oral: get('oral'),
//     lab: get('lab'),
//     finalExam: get('finalExam'),
//     totalMark: get('totalMark'),
//   };

//   // Helper to set specific errors with message
//   const setFieldError = (control: AbstractControl | null, key: string, message: string) => {
//     if (control) {
//       const errors = control.errors || {};
//       errors[key] = message;
//       control.setErrors(errors);
//     }
//   };

//   const clearFieldError = (control: AbstractControl | null, key: string) => {
//     if (control?.errors?.[key]) {
//       const errors = { ...control.errors };
//       delete errors[key];
//       control.setErrors(Object.keys(errors).length ? errors : null);
//     }
//   };

//   // Clear previous messages
//   Object.values(controls).forEach(control => {
//     clearFieldError(control, 'invalidMark');
//   });

//   let isValid = true;

//   if (hours === 2) {
//     if (hasLab) isValid = false;
//     if (midTerm !== 25) {
//       setFieldError(controls.midTerm, 'invalidMark', 'For 2-hour course, midterm must be 25');
//       isValid = false;
//     }
//     if (oral !== 5) {
//       setFieldError(controls.oral, 'invalidMark', 'For 2-hour course, oral must be 5');
//       isValid = false;
//     }
//     if (lab !== 0) {
//       setFieldError(controls.lab, 'invalidMark', '2-hour course must not have lab');
//       isValid = false;
//     }
//     if (finalExam !== 70) {
//       setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 70');
//       isValid = false;
//     }
//     if (totalMark !== 100) {
//       setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 100');
//       isValid = false;
//     }
//   } else if (hours === 3 && hasLab) {
//     if ((midTerm + oral + lab) !== 60) {
//       setFieldError(controls.midTerm, 'invalidMark', 'Sum of midterm + oral + lab must be 60');
//       setFieldError(controls.oral, 'invalidMark', 'Sum of midterm + oral + lab must be 60');
//       setFieldError(controls.lab, 'invalidMark', 'Sum of midterm + oral + lab must be 60');
//       isValid = false;
//     }
//     if (finalExam !== 90) {
//       setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 90');
//       isValid = false;
//     }
//     if (totalMark !== 150) {
//       setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 150');
//       isValid = false;
//     }
//   } else if (hours === 3 && !hasLab) {
//     if (midTerm !== 37) {
//       setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 37 for 3-hour no-lab course');
//       isValid = false;
//     }
//     if (oral !== 8) {
//       setFieldError(controls.oral, 'invalidMark', 'Oral must be 8 for 3-hour no-lab course');
//       isValid = false;
//     }
//     if (lab !== 0) {
//       setFieldError(controls.lab, 'invalidMark', 'Lab must be 0 for 3-hour no-lab course');
//       isValid = false;
//     }
//     if (finalExam !== 105) {
//       setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 105 for 3-hour no-lab course');
//       isValid = false;
//     }
//     if (totalMark !== 150) {
//       setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 150');
//       isValid = false;
//     }
//   } else if (hours === 4) {
//     if (!hasLab) {
//       isValid = false;
//       setFieldError(controls.lab, 'invalidMark', '4-hour course must have a lab');
//     }
//     if (midTerm !== 20) {
//       setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 20 for 4-hour course');
//       isValid = false;
//     }
//     if (oral !== 10) {
//       setFieldError(controls.oral, 'invalidMark', 'Oral must be 10 for 4-hour course');
//       isValid = false;
//     }
//     if (lab !== 50) {
//       setFieldError(controls.lab, 'invalidMark', 'Lab must be 50 for 4-hour course');
//       isValid = false;
//     }
//     if (finalExam !== 120) {
//       setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 120 for 4-hour course');
//       isValid = false;
//     }
//     if (totalMark !== 200) {
//       setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 200 for 4-hour course');
//       isValid = false;
//     }
//   } else {
//     setFieldError(controls.totalMark, 'invalidMark', 'Invalid course hours configuration');
//     isValid = false;
//   }

//   return null;
// };

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const courseMarkValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  if (!group || !(group instanceof AbstractControl)) return null;

  const get = (name: string) => group.get(name);
  const toNumber = (value: any) => +value || 0;

  const hours = toNumber(get('course_hours')?.value);
  const hasLab = !!get('has_Lab')?.value;

  const midTerm = toNumber(get('midTerm')?.value);
  const oral = toNumber(get('oral')?.value);
  const lab = toNumber(get('lab')?.value);
  const finalExam = toNumber(get('finalExam')?.value);
  const totalMark = toNumber(get('totalMark')?.value);

  const controls = {
    midTerm: get('midTerm'),
    oral: get('oral'),
    lab: get('lab'),
    finalExam: get('finalExam'),
    totalMark: get('totalMark'),
  };

  const setFieldError = (control: AbstractControl | null, key: string, message: string) => {
    if (control) {
      const errors = control.errors || {};
      errors[key] = message;
      control.setErrors(errors);
    }
  };

  const clearFieldError = (control: AbstractControl | null, key: string) => {
    if (control?.errors?.[key]) {
      const errors = { ...control.errors };
      delete errors[key];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }
  };

  // Clear previous validation errors
  Object.values(controls).forEach(control => clearFieldError(control, 'invalidMark'));

  let isValid = true;

  // === Validation Logic ===
  if (hours === 2) {
    if (hasLab) {
      // Special case: 2-hour course with lab
      if (midTerm !== 25) {
        setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 25 for 2-hour course with lab');
        isValid = false;
      }
      if (oral !== 5) {
        setFieldError(controls.oral, 'invalidMark', 'Oral must be 5 for 2-hour course with lab');
        isValid = false;
      }
      if (lab !== 10) {
        setFieldError(controls.lab, 'invalidMark', 'Lab must be 10 for 2-hour course with lab');
        isValid = false;
      }
      if ((midTerm + oral + lab) !== 40) {
        setFieldError(controls.totalMark, 'invalidMark', 'Midterm + Oral + Lab must be 40');
        isValid = false;
      }
      if (finalExam !== 60) {
        setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 60 for 2-hour course with lab');
        isValid = false;
      }
      if (totalMark !== 100) {
        setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 100');
        isValid = false;
      }
    } else {
      // Normal 2-hour course without lab
      if (midTerm !== 25) {
        setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 25 for 2-hour course');
        isValid = false;
      }
      if (oral !== 5) {
        setFieldError(controls.oral, 'invalidMark', 'Oral must be 5 for 2-hour course');
        isValid = false;
      }
      if (lab !== 0) {
        setFieldError(controls.lab, 'invalidMark', 'Lab must be 0 for 2-hour course without lab');
        isValid = false;
      }
      if (finalExam !== 70) {
        setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 70 for 2-hour course');
        isValid = false;
      }
      if (totalMark !== 100) {
        setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 100');
        isValid = false;
      }
    }
  } else if (hours === 3) {
    if (hasLab) {
      if ((midTerm + oral + lab) !== 60) {
        ['midTerm', 'oral', 'lab'].forEach(key => setFieldError(controls[key as keyof typeof controls], 'invalidMark', 'Sum of midterm + oral + lab must be 60'));
        isValid = false;
      }
      if (finalExam !== 90) {
        setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 90');
        isValid = false;
      }
      if (totalMark !== 150) {
        setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 150');
        isValid = false;
      }
    } else {
      if (midTerm !== 37) {
        setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 37 for 3-hour no-lab course');
        isValid = false;
      }
      if (oral !== 8) {
        setFieldError(controls.oral, 'invalidMark', 'Oral must be 8 for 3-hour no-lab course');
        isValid = false;
      }
      if (lab !== 0) {
        setFieldError(controls.lab, 'invalidMark', 'Lab must be 0 for 3-hour no-lab course');
        isValid = false;
      }
      if (finalExam !== 105) {
        setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 105 for 3-hour no-lab course');
        isValid = false;
      }
      if (totalMark !== 150) {
        setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 150');
        isValid = false;
      }
    }
  } else if (hours === 4) {
    if (!hasLab) {
      setFieldError(controls.lab, 'invalidMark', '4-hour course must have a lab');
      isValid = false;
    }
    if (midTerm !== 20) {
      setFieldError(controls.midTerm, 'invalidMark', 'Midterm must be 20 for 4-hour course');
      isValid = false;
    }
    if (oral !== 10) {
      setFieldError(controls.oral, 'invalidMark', 'Oral must be 10 for 4-hour course');
      isValid = false;
    }
    if (lab !== 50) {
      setFieldError(controls.lab, 'invalidMark', 'Lab must be 50 for 4-hour course');
      isValid = false;
    }
    if (finalExam !== 120) {
      setFieldError(controls.finalExam, 'invalidMark', 'Final exam must be 120 for 4-hour course');
      isValid = false;
    }
    if (totalMark !== 200) {
      setFieldError(controls.totalMark, 'invalidMark', 'Total mark must be 200 for 4-hour course');
      isValid = false;
    }
  } else {
    setFieldError(controls.totalMark, 'invalidMark', 'Invalid course hours configuration');
    isValid = false;
  }

  return null;
};
