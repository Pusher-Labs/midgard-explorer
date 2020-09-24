import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerUiComponent } from './explorer-ui.component';

describe('ExplorerUiComponent', () => {
  let component: ExplorerUiComponent;
  let fixture: ComponentFixture<ExplorerUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
