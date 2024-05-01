import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneCommentComponent } from './milestone-comment.component';

describe('MilestoneCommentComponent', () => {
  let component: MilestoneCommentComponent;
  let fixture: ComponentFixture<MilestoneCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilestoneCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MilestoneCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
