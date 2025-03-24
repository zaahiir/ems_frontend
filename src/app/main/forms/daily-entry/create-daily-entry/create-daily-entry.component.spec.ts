import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyEntryComponent } from './create-daily-entry.component';

describe('CreateDailyEntryComponent', () => {
  let component: CreateDailyEntryComponent;
  let fixture: ComponentFixture<CreateDailyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDailyEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDailyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
