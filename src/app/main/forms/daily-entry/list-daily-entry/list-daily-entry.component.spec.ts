import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDailyEntryComponent } from './list-daily-entry.component';

describe('ListDailyEntryComponent', () => {
  let component: ListDailyEntryComponent;
  let fixture: ComponentFixture<ListDailyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDailyEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDailyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
