import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlerMasterComponent } from './controler-master.component';

describe('ControlerMasterComponent', () => {
  let component: ControlerMasterComponent;
  let fixture: ComponentFixture<ControlerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
