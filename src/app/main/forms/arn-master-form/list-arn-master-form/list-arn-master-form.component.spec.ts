import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArnMasterFormComponent } from './list-arn-master-form.component';

describe('ListArnMasterFormComponent', () => {
  let component: ListArnMasterFormComponent;
  let fixture: ComponentFixture<ListArnMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArnMasterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListArnMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
