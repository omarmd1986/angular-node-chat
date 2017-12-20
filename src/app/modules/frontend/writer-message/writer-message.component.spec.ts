import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterMessageComponent } from './writer-message.component';

describe('WriterMessageComponent', () => {
  let component: WriterMessageComponent;
  let fixture: ComponentFixture<WriterMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
