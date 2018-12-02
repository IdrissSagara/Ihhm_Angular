import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmiersComponent } from './infirmiers.component';

describe('InfirmiersComponent', () => {
  let component: InfirmiersComponent;
  let fixture: ComponentFixture<InfirmiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfirmiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
