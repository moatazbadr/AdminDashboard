import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const courseMarkValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  if (!group || !(group instanceof AbstractControl)) return null;

  const hours = +group.get('course_hours')?.value;
  const hasLab = group.get('has_Lab')?.value;

  const midTerm = +group.get('midTerm')?.value || 0;
  const oral = +group.get('oral')?.value || 0;
  const lab = +group.get('lab')?.value || 0;
  const finalExam = +group.get('finalExam')?.value || 0;
  const totalMark = +group.get('totalMark')?.value || 0;

  let isValid = true;

  if (hours === 2) {
    isValid = !hasLab &&
              midTerm === 25 &&
              oral === 5 &&
              lab === 0 &&
              finalExam === 70 &&
              totalMark === 100;
  } else if (hours === 3 && hasLab) {
    isValid = (midTerm + oral + lab) === 60 &&
              finalExam === 90 &&
              totalMark === 150;
  } else if (hours === 3 && !hasLab) {
    isValid = midTerm === 37 &&
              oral === 8 &&
              lab === 0 &&
              finalExam === 105 &&
              totalMark === 150;
  } else if (hours === 4) {
    isValid = hasLab &&
              midTerm === 20 &&
              oral === 10 &&
              lab === 50 &&
              finalExam === 120 &&
              totalMark === 200;
  } else {
    isValid = false;
  }

  return isValid ? null : {  invalidCourseMarks: true };
};
