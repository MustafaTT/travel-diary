/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserTravelComponent } from './user-travel.component';

describe('UserTravelComponent', () => {
  let component: UserTravelComponent;
  let fixture: ComponentFixture<UserTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
