import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsProfesorComponent } from './statistics-profesor.component';

describe('StatisticsProfesorComponent', () => {
  let component: StatisticsProfesorComponent;
  let fixture: ComponentFixture<StatisticsProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
