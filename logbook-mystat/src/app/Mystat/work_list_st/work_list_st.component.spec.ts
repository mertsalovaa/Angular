/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkListStComponent } from './work_list_st.component';

describe('Work_list_stComponent', () => {
  let component: WorkListStComponent;
  let fixture: ComponentFixture<WorkListStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
