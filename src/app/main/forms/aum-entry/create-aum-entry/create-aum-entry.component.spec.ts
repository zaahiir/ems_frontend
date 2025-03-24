import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAumEntryComponent } from './create-aum-entry.component';

describe('CreateAumEntryComponent', () => {
  let component: CreateAumEntryComponent;
  let fixture: ComponentFixture<CreateAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
