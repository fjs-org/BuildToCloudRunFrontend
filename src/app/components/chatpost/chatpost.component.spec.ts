import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPostComponent } from './chatpost.component';

describe('ChatPostComponent', () => {
  let component: ChatPostComponent;
  let fixture: ComponentFixture<ChatPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
