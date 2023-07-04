import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProcedureComponent } from './claim-procedure.component';

describe('ClaimProcedureComponent', () => {
  let component: ClaimProcedureComponent;
  let fixture: ComponentFixture<ClaimProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimProcedureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
