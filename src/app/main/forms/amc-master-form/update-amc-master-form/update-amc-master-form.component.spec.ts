import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmcMasterFormComponent } from './update-amc-master-form.component';

describe('UpdateAmcMasterFormComponent', () => {
  let component: UpdateAmcMasterFormComponent;
  let fixture: ComponentFixture<UpdateAmcMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAmcMasterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAmcMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
