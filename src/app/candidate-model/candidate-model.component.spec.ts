import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateModelComponent } from './candidate-model.component';

describe('CandidateModelComponent', () => {
  let component: CandidateModelComponent;
  let fixture: ComponentFixture<CandidateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
