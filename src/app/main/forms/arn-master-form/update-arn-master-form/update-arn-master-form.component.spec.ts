import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArnMasterFormComponent } from './update-arn-master-form.component';

describe('UpdateArnMasterFormComponent', () => {
  let component: UpdateArnMasterFormComponent;
  let fixture: ComponentFixture<UpdateArnMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateArnMasterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateArnMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
