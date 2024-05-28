import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpmComponent } from './addpm.component';

describe('AddpmComponent', () => {
  let component: AddpmComponent;
  let fixture: ComponentFixture<AddpmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpmComponent]
    });
    fixture = TestBed.createComponent(AddpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
