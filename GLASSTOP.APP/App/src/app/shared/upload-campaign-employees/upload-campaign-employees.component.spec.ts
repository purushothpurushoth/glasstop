import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCampaignEmployeesComponent } from './upload-campaign-employees.component';

describe('UploadCampaignEmployeesComponent', () => {
  let component: UploadCampaignEmployeesComponent;
  let fixture: ComponentFixture<UploadCampaignEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCampaignEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCampaignEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
