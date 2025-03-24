import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArnMasterFormComponent } from './create-arn-master-form.component';

describe('CreateArnMasterFormComponent', () => {
  let component: CreateArnMasterFormComponent;
  let fixture: ComponentFixture<CreateArnMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArnMasterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateArnMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
