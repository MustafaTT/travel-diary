/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TravelEditComponent } from './travel-edit.component';

describe('TravelEditComponent', () => {
  let component: TravelEditComponent;
  let fixture: ComponentFixture<TravelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
