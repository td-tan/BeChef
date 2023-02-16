import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display legend', () => {
    const legend: HTMLElement = fixture.nativeElement.querySelector('legend');
    expect(legend.textContent).toContain('Login');
  });

  it('should display labels for Email and Password', () => {
    const labelEmail: HTMLElement = fixture.nativeElement.querySelector('label[for="email"]');
    const labelPassword: HTMLElement = fixture.nativeElement.querySelector('label[for="password"]');

    expect(labelEmail.textContent).toContain('Email');
    expect(labelPassword.textContent).toContain('Password');
  });

  it('should find input for Email and Password', () => {
    const inputEmail: HTMLElement = fixture.nativeElement.querySelector('input#email');
    const inputPassword: HTMLElement = fixture.nativeElement.querySelector('input#password');

    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
  });

  it('it should find remember me checkbox', () => {
    const inputRememberMe: HTMLElement = fixture.nativeElement.querySelector('input#rememberMe');

    expect(inputRememberMe).toBeTruthy();
  });

  it('it should find login button', () => {
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Login');
  });
});
