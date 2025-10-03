import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUniverseComponent } from './my-universe';

describe('MyUniverseComponent', () => {
  let component: MyUniverseComponent;
  let fixture: ComponentFixture<MyUniverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUniverseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUniverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
