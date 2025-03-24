import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAumEntryYoyGrowthComponent } from './update-aum-entry-yoy-growth.component';

describe('UpdateAumEntryYoyGrowthComponent', () => {
  let component: UpdateAumEntryYoyGrowthComponent;
  let fixture: ComponentFixture<UpdateAumEntryYoyGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAumEntryYoyGrowthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAumEntryYoyGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
