import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionFormComponent } from './recognition-form.component';

describe('RecognitionFormComponent', () => {
  let component: RecognitionFormComponent;
  let fixture: ComponentFixture<RecognitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognitionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
