import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevmComponent } from './createvm.component';

describe('CreatevmComponent', () => {
  let component: CreatevmComponent;
  let fixture: ComponentFixture<CreatevmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatevmComponent]
    });
    fixture = TestBed.createComponent(CreatevmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
