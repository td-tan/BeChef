import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all buttons', () => {
    const buttons: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
    expect(buttons[0].textContent).toContain('Join Team');
    expect(buttons[1].textContent).toContain('Create Team');
  });
});
