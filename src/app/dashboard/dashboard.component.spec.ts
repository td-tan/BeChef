import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user welcome banner', () => {
    const banner: HTMLElement = fixture.nativeElement.querySelector('.banner');
    expect(banner.textContent).toContain('Hello');
  });

  it('should display submenu navigation', () => {
    const subnav: HTMLElement = fixture.nativeElement.querySelector('.subnav');
    const sections: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.subnav section');

    expect(subnav).toBeTruthy();
    expect(sections?.length).toBe(3);
    expect(sections[0].textContent).toContain('Leaderboard');
    expect(sections[1].textContent).toContain('Recipes');
    expect(sections[2].textContent).toContain('Team');
  });

});
