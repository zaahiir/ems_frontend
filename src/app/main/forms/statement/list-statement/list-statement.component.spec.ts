import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatementComponent } from './list-statement.component';

describe('ListStatementComponent', () => {
  let component: ListStatementComponent;
  let fixture: ComponentFixture<ListStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
