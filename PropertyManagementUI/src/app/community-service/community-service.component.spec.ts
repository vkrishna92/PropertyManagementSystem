import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityServiceComponent } from './community-service.component';

describe('CommunityServiceComponent', () => {
  let component: CommunityServiceComponent;
  let fixture: ComponentFixture<CommunityServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
