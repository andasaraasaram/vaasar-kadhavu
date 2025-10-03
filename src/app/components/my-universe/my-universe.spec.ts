import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUniverse } from './my-universe';

describe('MyUniverse', () => {
  let component: MyUniverse;
  let fixture: ComponentFixture<MyUniverse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUniverse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUniverse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
