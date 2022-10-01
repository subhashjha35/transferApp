import { createAction, props } from '@ngrx/store';
import {
    Transaction,
    TransactionResponse,
} from './../../../../server/src/model/transaction.model';

export const listTransactions = createAction('[Transaction] List Transactions');
export const listTransactionsSuccess = createAction(
    '[Transaction] List Transactions Success',
    props<{ transactions: TransactionResponse[] }>()
);
export const listTransactionsFailed = createAction(
    '[Transaction] List Transactions Failed',
    props<{ message?: string }>()
);

export const createTransaction = createAction(
    '[Transaction] Create Transaction',
    props<{ transaction: Transaction }>()
);
export const createTransactionSuccess = createAction(
    '[Transaction] Create Transaction Success',
    props<{ transaction: TransactionResponse }>()
);
export const createTransactionFailed = createAction(
    '[Transaction] Create Transaction Failed',
    props<{ message?: string }>()
);

export const updateTransaction = createAction(
    '[Transaction] Update Transaction',
    props<{ id: string; transaction: Transaction }>()
);
export const updateTransactionSuccess = createAction(
    '[Transaction] Update Transaction Success',
    props<{ transaction: TransactionResponse }>()
);
export const updateTransactionFailed = createAction(
    '[Transaction] Update Transaction Failed',
    props<{ message?: string }>()
);

export const deleteTransaction = createAction(
    '[Transaction] Delete Transaction',
    props<{ transactionId: string }>()
);
export const deleteTransactionSuccess = createAction(
    '[Transaction] Delete Transaction Success'
);
export const deleteTransactionFailed = createAction(
    '[Transaction] Delete Transaction Failed',
    props<{ message?: string }>()
);
