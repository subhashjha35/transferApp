import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let spectator: Spectator<TransactionFormComponent>;
  let component: TransactionFormComponent;

  let store: MockStore;
  const createComponent = createComponentFactory<TransactionFormComponent>({
    component: TransactionFormComponent,
    imports: [],
    declarations: [],
    providers: [
      provideMockStore({}),
      mockProvider(FormBuilder),
      mockProvider(ModalController),
    ],
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
