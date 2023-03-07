import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing' 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecipeContentComponent } from './recipe-content.component';

describe('RecipeContentComponent', () => {
  let component: RecipeContentComponent;
  let fixture: ComponentFixture<RecipeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeContentComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display back button only', () => {
    const buttons: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('button');
    expect(buttons?.length).toBe(1);
    expect(buttons[0].textContent).toContain('Go Back');
  });
});
