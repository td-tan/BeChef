import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [ 
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display legend', () => {
    const legend: HTMLElement = fixture.nativeElement.querySelector('legend');
    expect(legend.textContent).toContain('Registration');
  });

  it('should display labels for Username, Email, Password and PasswordRepeat', () => {
    const labelUsername: HTMLElement = fixture.nativeElement.querySelector('label[for="username"]');
    const labelEmail: HTMLElement = fixture.nativeElement.querySelector('label[for="email"]');
    const labelPassword: HTMLElement = fixture.nativeElement.querySelector('label[for="password"]');
    const labelPasswordRepeat: HTMLElement = fixture.nativeElement.querySelector('label[for="passwordRepeat"]');

    expect(labelUsername.textContent).toContain('Username');
    expect(labelEmail.textContent).toContain('Email');
    expect(labelPassword.textContent).toContain('Password');
    expect(labelPasswordRepeat.textContent).toContain('Confirm Password');
  });

  it('should find input for Email and Password', () => {
    const inputUsername: HTMLElement = fixture.nativeElement.querySelector('input#username');
    const inputEmail: HTMLElement = fixture.nativeElement.querySelector('input#email');
    const inputPassword: HTMLElement = fixture.nativeElement.querySelector('input#password');
    const inputPasswordRepeat: HTMLElement = fixture.nativeElement.querySelector('input#passwordRepeat');

    expect(inputUsername).toBeTruthy();
    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(inputPasswordRepeat).toBeTruthy();
  });

  it('it should find register button', () => {
    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Register');
  });
});
