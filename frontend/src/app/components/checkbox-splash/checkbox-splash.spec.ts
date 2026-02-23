import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSplash } from './checkbox-splash';

describe('CheckboxSplash', () => {
  let component: CheckboxSplash;
  let fixture: ComponentFixture<CheckboxSplash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxSplash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxSplash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
