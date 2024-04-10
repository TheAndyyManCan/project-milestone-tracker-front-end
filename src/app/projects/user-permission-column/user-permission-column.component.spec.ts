import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionColumnComponent } from './user-permission-column.component';

describe('UserPermissionColumnComponent', () => {
  let component: UserPermissionColumnComponent;
  let fixture: ComponentFixture<UserPermissionColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPermissionColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPermissionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
