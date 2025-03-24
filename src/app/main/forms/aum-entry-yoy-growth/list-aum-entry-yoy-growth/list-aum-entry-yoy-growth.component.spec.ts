import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAumEntryYoyGrowthComponent } from './list-aum-entry-yoy-growth.component';

describe('ListAumEntryYoyGrowthComponent', () => {
  let component: ListAumEntryYoyGrowthComponent;
  let fixture: ComponentFixture<ListAumEntryYoyGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAumEntryYoyGrowthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAumEntryYoyGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
