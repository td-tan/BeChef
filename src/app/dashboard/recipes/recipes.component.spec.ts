import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing' 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display buttons without delete', () => {
    const buttons: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('button');
    expect(buttons?.length).toBe(3);
    expect(buttons[0].textContent).toContain('My Recipes');
    expect(buttons[1].textContent).toContain('Show All');
    expect(buttons[2].textContent).toContain('+');
  });
});
