import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyEntryComponent } from './update-daily-entry.component';

describe('UpdateDailyEntryComponent', () => {
  let component: UpdateDailyEntryComponent;
  let fixture: ComponentFixture<UpdateDailyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDailyEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDailyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
