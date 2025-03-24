import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAumEntryYoyGrowthComponent } from './create-aum-entry-yoy-growth.component';

describe('CreateAumEntryYoyGrowthComponent', () => {
  let component: CreateAumEntryYoyGrowthComponent;
  let fixture: ComponentFixture<CreateAumEntryYoyGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAumEntryYoyGrowthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAumEntryYoyGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
