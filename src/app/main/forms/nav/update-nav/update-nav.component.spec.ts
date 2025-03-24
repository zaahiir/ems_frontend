import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNavComponent } from './update-nav.component';

describe('UpdateNavComponent', () => {
  let component: UpdateNavComponent;
  let fixture: ComponentFixture<UpdateNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
