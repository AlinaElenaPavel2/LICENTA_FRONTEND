import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncesComponent } from './announces.component';

describe('AnnouncesComponent', () => {
  let component: AnnouncesComponent;
  let fixture: ComponentFixture<AnnouncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
