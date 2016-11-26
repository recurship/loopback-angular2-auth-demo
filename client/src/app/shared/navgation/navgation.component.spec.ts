/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavgationComponent } from './navgation.component';

describe('NavgationComponent', () => {
  let component: NavgationComponent;
  let fixture: ComponentFixture<NavgationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavgationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavgationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
