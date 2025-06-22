import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagment } from './book-management';

describe('BookManagment', () => {
  let component: BookManagment;
  let fixture: ComponentFixture<BookManagment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookManagment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookManagment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
