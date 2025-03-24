import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAumEntryComponent } from './update-aum-entry.component';

describe('UpdateAumEntryComponent', () => {
  let component: UpdateAumEntryComponent;
  let fixture: ComponentFixture<UpdateAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
