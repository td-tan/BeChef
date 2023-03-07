import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password';
    const success_resp = {
      success: true
    };

    expect(service.getUsername()).toBe('');

    service.login(email, password).subscribe(response => {
      expect(response.success).toBeTrue();
    });

    const api_login = httpTestingController.expectOne('/api/login');
    expect(api_login.request.method).toEqual('POST');
    expect(api_login.request.body).toEqual({email, password});

    api_login.flush(success_resp);

    tick();
  }));
});
