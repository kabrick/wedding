import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Timeline', () => {
  let component: Timeline;
  let fixture: ComponentFixture<Timeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have timeline events', () => {
    expect(component.timelineEvents).toBeDefined();
    expect(component.timelineEvents.length).toBeGreaterThan(0);
  });

  it('should have required properties for each event', () => {
    component.timelineEvents.forEach(event => {
      expect(event.time).toBeDefined();
      expect(event.title).toBeDefined();
      expect(event.description).toBeDefined();
      expect(event.icon).toBeDefined();
    });
  });
});