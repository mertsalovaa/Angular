/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MystatComponent } from './Mystat.component';

describe('MystatComponent', () => {
  let component: MystatComponent;
  let fixture: ComponentFixture<MystatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MystatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
