import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedplansComponent } from './searchedplans.component';

describe('SearchedplansComponent', () => {
  let component: SearchedplansComponent;
  let fixture: ComponentFixture<SearchedplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchedplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
