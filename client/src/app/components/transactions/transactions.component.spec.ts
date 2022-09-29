import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let spectator: Spectator<TransactionsComponent>;
  let component: TransactionsComponent;

  let store: MockStore;
  const createComponent = createComponentFactory<TransactionsComponent>({
    component: TransactionsComponent,
    imports: [],
    providers: [
      provideMockStore({ }),
    ],
    declarations: []
  })

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
