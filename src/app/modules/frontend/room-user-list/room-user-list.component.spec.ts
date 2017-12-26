import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUserListComponent } from './room-user-list.component';

describe('RoomUserListComponent', () => {
  let component: RoomUserListComponent;
  let fixture: ComponentFixture<RoomUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
