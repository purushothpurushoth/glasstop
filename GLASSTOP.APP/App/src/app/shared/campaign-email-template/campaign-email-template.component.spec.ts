import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignEmailTemplateComponent } from './campaign-email-template.component';

describe('CampaignEmailTemplateComponent', () => {
  let component: CampaignEmailTemplateComponent;
  let fixture: ComponentFixture<CampaignEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignEmailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
