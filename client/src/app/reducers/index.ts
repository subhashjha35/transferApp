import { MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as transactionReducers from './transaction.reducers';

// export interface AppState {
//   transactions: TransactionState
// }

export const reducers = {
  transactions: transactionReducers.transactionReducers
};


export const metaReducers: MetaReducer[] = !environment.production
  ? []
  : [];
