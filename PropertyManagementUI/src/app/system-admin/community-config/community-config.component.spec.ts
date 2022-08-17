import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityConfigComponent } from './community-config.component';

describe('CommunityConfigComponent', () => {
  let component: CommunityConfigComponent;
  let fixture: ComponentFixture<CommunityConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
