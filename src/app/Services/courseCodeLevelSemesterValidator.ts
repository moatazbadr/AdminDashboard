import { AbstractControl, ValidationErrors } from '@angular/forms';

export function courseCodeLevelSemesterValidator(control: AbstractControl): ValidationErrors | null {
  const code = control.get('courseCode')?.value;
  const level = +control.get('course_level')?.value;
  const semester = +control.get('course_semster')?.value;

  if (!code || !/^COMP(10|20|30|40)\d{2}$/.test(code)) {
    return null; // Already handled by other validators
  }

  const codeMatch = code.match(/^COMP(\d{2})(\d)$/);
  if (!codeMatch) return null;

  const extractedLevel = +codeMatch[1].charAt(0);
  const lastDigit = +codeMatch[2];
  const expectedSemester = lastDigit % 2 === 0 ? 2 : 1;

  if (level !== extractedLevel || semester !== expectedSemester) {
    return { courseCodeLevelSemesterMismatch: true };
  }

  return null;
}
