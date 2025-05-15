import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyscriptsComponent } from './myscripts.component';

describe('MyscriptsComponent', () => {
  let component: MyscriptsComponent;
  let fixture: ComponentFixture<MyscriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyscriptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
