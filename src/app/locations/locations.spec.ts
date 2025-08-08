import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Locations } from './locations';

describe('Locations', () => {
  let component: Locations;
  let fixture: ComponentFixture<Locations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have church location', () => {
    expect(component.churchLocation).toBeDefined();
    expect(component.churchLocation.name).toBeTruthy();
    expect(component.churchLocation.address).toBeTruthy();
  });

  it('should have reception location', () => {
    expect(component.receptionLocation).toBeDefined();
    expect(component.receptionLocation.name).toBeTruthy();
    expect(component.receptionLocation.address).toBeTruthy();
  });
});