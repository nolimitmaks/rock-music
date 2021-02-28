import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubApiComponent } from './github-api.component';

describe('GithubApiComponent', () => {
  let component: GithubApiComponent;
  let fixture: ComponentFixture<GithubApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
