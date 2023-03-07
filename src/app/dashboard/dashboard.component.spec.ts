import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing' 
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule
      ]
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
    const a: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.subnav a');

    expect(subnav).toBeTruthy();
    expect(a?.length).toBe(3);
    expect(a[0].textContent).toContain('Leaderboard');
    expect(a[1].textContent).toContain('Recipes');
    expect(a[2].textContent).toContain('Team');
  });

});
