import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVMComponent } from './my-vm.component';

describe('MyVMComponent', () => {
  let component: MyVMComponent;
  let fixture: ComponentFixture<MyVMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVMComponent]
    });
    fixture = TestBed.createComponent(MyVMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
