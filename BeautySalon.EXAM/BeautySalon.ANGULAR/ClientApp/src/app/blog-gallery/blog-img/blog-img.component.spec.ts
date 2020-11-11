/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlogImgComponent } from './blog-img.component';

describe('BlogImgComponent', () => {
  let component: BlogImgComponent;
  let fixture: ComponentFixture<BlogImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
