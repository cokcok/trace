import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Sysgroupmenu01Page } from './sysgroupmenu01.page';

describe('Sysgroupmenu01Page', () => {
  let component: Sysgroupmenu01Page;
  let fixture: ComponentFixture<Sysgroupmenu01Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Sysgroupmenu01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Sysgroupmenu01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
