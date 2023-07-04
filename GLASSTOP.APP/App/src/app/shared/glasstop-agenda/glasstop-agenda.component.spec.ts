import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlasstopAgendaComponent } from './glasstop-agenda.component';

describe('GlasstopAgendaComponent', () => {
  let component: GlasstopAgendaComponent;
  let fixture: ComponentFixture<GlasstopAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlasstopAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlasstopAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
