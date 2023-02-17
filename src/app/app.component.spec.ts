import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing' 
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BeChef'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('BeChef');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header h1')?.textContent).toContain('BeChef');
  });

  it('should have login and register link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('header nav a')?.length).toBe(2);

  });

  it('should have github link in footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('footer .github-profile')?.textContent).toContain('td-tan');

  });

  it('should have powered by stack in footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('footer .stack')?.textContent).toContain('powered by');
    expect(compiled.querySelector('footer .stack .mongodb')).toBeTruthy();
    expect(compiled.querySelector('footer .stack .expressjs')).toBeTruthy();
    expect(compiled.querySelector('footer .stack .angular')).toBeTruthy();
    expect(compiled.querySelector('footer .stack .nodejs')).toBeTruthy();
  });

  it('should have YOU CAN card', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main .card')).toBeTruthy();
    expect(compiled.querySelector('main .card h2')?.textContent).toContain('YOU CAN');
  });
});
