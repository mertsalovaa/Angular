/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkItemStComponent } from './work_item_st.component';

describe('Work_item_stComponent', () => {
  let component: WorkItemStComponent;
  let fixture: ComponentFixture<WorkItemStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkItemStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkItemStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
