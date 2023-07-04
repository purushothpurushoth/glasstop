import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackGreetingComponent } from './feedback-greeting.component';

describe('FeedbackGreetingComponent', () => {
  let component: FeedbackGreetingComponent;
  let fixture: ComponentFixture<FeedbackGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackGreetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
