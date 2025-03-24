import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarketingComponent } from './update-marketing.component';

describe('UpdateMarketingComponent', () => {
  let component: UpdateMarketingComponent;
  let fixture: ComponentFixture<UpdateMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
