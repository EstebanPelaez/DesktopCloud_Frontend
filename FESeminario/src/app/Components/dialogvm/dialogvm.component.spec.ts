import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvmComponent } from './dialogvm.component';

describe('DialogvmComponent', () => {
  let component: DialogvmComponent;
  let fixture: ComponentFixture<DialogvmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogvmComponent]
    });
    fixture = TestBed.createComponent(DialogvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
