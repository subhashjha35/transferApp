import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import * as transactionReducers from './transaction.reducers';
export interface AppState {
    transactions: transactionReducers.TransactionState;
}

export const reducers: ActionReducerMap<AppState> = {
    transactions: transactionReducers.reducers,
};

export const getTransactionState =
    createFeatureSelector<transactionReducers.TransactionState>('transactions');

export const getAllTransactions = createSelector(
    getTransactionState,
    state => state.list
);

export const getTransactionForId = (id: string) =>
    createSelector(getAllTransactions, state =>
        state.find(transaction => transaction.id === id)
    );

export const logger = (reducer: ActionReducer<AppState>) => storeLogger()(reducer);

export const metaReducers: MetaReducer<AppState>[] = [logger];
