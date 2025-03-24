import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourierComponent } from './list-courier.component';

describe('ListCourierComponent', () => {
  let component: ListCourierComponent;
  let fixture: ComponentFixture<ListCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
