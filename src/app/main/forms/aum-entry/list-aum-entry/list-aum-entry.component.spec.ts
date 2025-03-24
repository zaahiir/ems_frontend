import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAumEntryComponent } from './list-aum-entry.component';

describe('ListAumEntryComponent', () => {
  let component: ListAumEntryComponent;
  let fixture: ComponentFixture<ListAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
