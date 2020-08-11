import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMemberDetailsComponent } from './company-member-details.component';

describe('CompanyMemberDetailsComponent', () => {
  let component: CompanyMemberDetailsComponent;
  let fixture: ComponentFixture<CompanyMemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMemberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
