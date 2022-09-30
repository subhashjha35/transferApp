import { AlertController, ModalController } from '@ionic/angular';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TransactionPage } from './transaction.page';

describe('TransactionPage', () => {
  let spectator: Spectator<TransactionPage>;
  let component: TransactionPage;

  let store: MockStore;
  const createComponent = createComponentFactory<TransactionPage>({
    component: TransactionPage,
    imports: [],
    declarations: [],
    providers: [
      provideMockStore({}),
      mockProvider(ModalController),
      mockProvider(AlertController)
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
