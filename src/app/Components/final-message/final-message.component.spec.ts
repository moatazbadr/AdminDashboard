import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMessageComponent } from './final-message.component';

describe('FinalMessageComponent', () => {
  let component: FinalMessageComponent;
  let fixture: ComponentFixture<FinalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
