import {
    createTransactionSuccess,
    listTransactions,
    listTransactionsFailed
} from '../actions/transaction.actions';
import { listTransactionsSuccess } from './../actions/transaction.actions';
import * as fromTransaction from './transaction.reducers';
import { initialState } from './transaction.reducers';

describe('TransactionReducer', () => {
    describe('listTransactions', () => {
        it('should set loading to true', () => {
            expect(
                fromTransaction.reducers(initialState, listTransactions())
            ).toEqual({ ...initialState, isLoaded: false, isLoading: true });
        });
    });

    describe('listTransactionsSuccess', () => {
        it('should set transaction list', () => {
            expect(
                fromTransaction.reducers(
                    initialState,
                    listTransactionsSuccess({
                        transactions: [{ name: 'name1' }] as any
                    })
                )
            ).toEqual({
                ...initialState,
                isLoaded: true,
                isLoading: false,
                list: [{ name: 'name1' }] as any
            });
        });
    });

    describe('listTransactionsFailed', () => {
        it('should set loaded and loading to false', () => {
            expect(
                fromTransaction.reducers(
                    initialState,
                    listTransactionsFailed({ message: 'error' })
                )
            ).toEqual({ ...initialState, isLoaded: false, isLoading: false });
        });
    });

    describe('createTransactionSuccess', () => {
        it('should add one transaction to list', () => {
            expect(
                fromTransaction.reducers(
                    initialState,
                    createTransactionSuccess({
                        transaction: { name: 'name1' } as any
                    })
                )
            ).toEqual({ ...initialState, list: [{ name: 'name1' }] as any });
        });
    });
});
