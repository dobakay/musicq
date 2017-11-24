import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicqComponent } from './musicq.component';

describe('MusicqComponent', () => {
  let component: MusicqComponent;
  let fixture: ComponentFixture<MusicqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
