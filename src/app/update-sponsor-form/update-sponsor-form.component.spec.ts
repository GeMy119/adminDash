import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSponsorFormComponent } from './update-sponsor-form.component';

describe('UpdateSponsorFormComponent', () => {
  let component: UpdateSponsorFormComponent;
  let fixture: ComponentFixture<UpdateSponsorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSponsorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSponsorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
