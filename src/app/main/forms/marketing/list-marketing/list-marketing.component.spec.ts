import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarketingComponent } from './list-marketing.component';

describe('ListMarketingComponent', () => {
  let component: ListMarketingComponent;
  let fixture: ComponentFixture<ListMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
