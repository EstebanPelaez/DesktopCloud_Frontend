import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmdetailsComponent } from './vmdetails.component';

describe('VmdetailsComponent', () => {
  let component: VmdetailsComponent;
  let fixture: ComponentFixture<VmdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmdetailsComponent]
    });
    fixture = TestBed.createComponent(VmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
