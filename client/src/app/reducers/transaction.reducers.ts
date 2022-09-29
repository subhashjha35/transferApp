import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/transaction.actions';
import { TransactionResponse } from './../../../../server/src/model/transaction.model';

export interface TransactionState {
  list: TransactionResponse[];
  isLoading: boolean;
  isLoaded: boolean;
}

export const initialState: TransactionState = {
  list: [],
  isLoading: false,
  isLoaded: false
};

const transactionReducers = createReducer(
  initialState,
  on(fromActions.listTransactions, (state, action) => ({
    ...state,
    list: [],
    isLoading: true,
    isLoaded: false
  })),

  on(fromActions.listTransactionsSuccess, (state, action) => ({
    ...state,
    list: action.transactions,
    isLoading: false,
    isLoaded: true
  })),

  on(fromActions.listTransactionsFailed, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: false
  })),

  on(fromActions.createTransactionSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.transaction]
    };
  }),

);

export function reducers(
  state = initialState,
  action: Action
): TransactionState {
  return transactionReducers(state, action);
}
