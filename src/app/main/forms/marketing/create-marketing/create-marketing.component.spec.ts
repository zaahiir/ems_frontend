import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarketingComponent } from './create-marketing.component';

describe('CreateMarketingComponent', () => {
  let component: CreateMarketingComponent;
  let fixture: ComponentFixture<CreateMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMarketingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
