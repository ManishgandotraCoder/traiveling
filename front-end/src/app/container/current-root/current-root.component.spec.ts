import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRootComponent } from './current-root.component';

describe('CurrentRootComponent', () => {
  let component: CurrentRootComponent;
  let fixture: ComponentFixture<CurrentRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
