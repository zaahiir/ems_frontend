import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmcMasterFormComponent } from './list-amc-master-form.component';

describe('ListAmcMasterFormComponent', () => {
  let component: ListAmcMasterFormComponent;
  let fixture: ComponentFixture<ListAmcMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAmcMasterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAmcMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
