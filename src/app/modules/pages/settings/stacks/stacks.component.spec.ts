import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StacksComponent } from './stacks.component';

describe('StacksComponent', () => {
  let component: StacksComponent;
  let fixture: ComponentFixture<StacksComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
