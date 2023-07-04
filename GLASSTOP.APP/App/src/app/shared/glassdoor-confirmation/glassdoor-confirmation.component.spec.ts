import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassdoorConfirmationComponent } from './glassdoor-confirmation.component';

describe('GlassdoorVerificationComponent', () => {
  let component: GlassdoorConfirmationComponent;
  let fixture: ComponentFixture<GlassdoorConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassdoorConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassdoorConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
