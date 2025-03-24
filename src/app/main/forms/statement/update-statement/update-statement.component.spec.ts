import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatementComponent } from './update-statement.component';

describe('UpdateStatementComponent', () => {
  let component: UpdateStatementComponent;
  let fixture: ComponentFixture<UpdateStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
