import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatementComponent } from './create-statement.component';

describe('CreateStatementComponent', () => {
  let component: CreateStatementComponent;
  let fixture: ComponentFixture<CreateStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
