import { TestBed } from '@angular/core/testing';
import { mockProvider, SpyObject } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    createTransaction,
    createTransactionFailed,
    createTransactionSuccess,
    deleteTransaction,
    deleteTransactionFailed,
    deleteTransactionSuccess,
    listTransactions,
    listTransactionsFailed,
    listTransactionsSuccess,
    updateTransaction,
    updateTransactionFailed,
    updateTransactionSuccess
} from './../actions/transaction.actions';
import { TransactionService } from './../services/api/transaction.service';
import { TransactionEffects } from './transaction.effects';

import { EffectsModule } from '@ngrx/effects';
import { marbles } from 'rxjs-marbles';
describe('TransactionEffects', () => {
    let serviceSpy: SpyObject<TransactionService>;
    let effect: TransactionEffects;
    let store: Store<any>;
    let actions$ = new Observable<Action>();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([TransactionEffects])
            ],
            providers: [
                TransactionEffects,
                mockProvider(TransactionService),
                provideMockActions(() => actions$)
            ]
        });

        serviceSpy = TestBed.inject(
            TransactionService
        ) as SpyObject<TransactionService>;

        effect = TestBed.inject(TransactionEffects);
        store = TestBed.inject(Store);
    });

    describe('listTransactions', () => {
        it(
            'can list all the transactions',
            marbles(async m => {
                actions$ = m.cold('a', { a: listTransactions() });

                serviceSpy.getAllTransactions.and.returnValue(
                    m.cold('a', { a: [] })
                );
                const expected = m.cold('a', {
                    a: listTransactionsSuccess({ transactions: [] })
                });

                await m
                    .expect(effect.listTransactions$)
                    .toBeObservable(expected);

                expect(serviceSpy.getAllTransactions).toHaveBeenCalledWith();
            })
        );

        it(
            'can handle transaction list fetching errors',
            marbles(async m => {
                actions$ = m.cold('a', { a: listTransactions() });

                serviceSpy.getAllTransactions.and.returnValue(
                    m.cold('#', { a: new Error('error') })
                );
                const expected = m.cold('a', {
                    a: listTransactionsFailed({ message: 'error' })
                });

                await m
                    .expect(effect.listTransactions$)
                    .toBeObservable(expected);

                expect(serviceSpy.getAllTransactions).toHaveBeenCalledWith();
            })
        );
    });

    describe('createTransaction', () => {
        it(
            'can list all the transactions',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: createTransaction({ transaction: {} as any })
                });

                serviceSpy.createTransaction.and.returnValue(
                    m.cold('a', { a: [] })
                );
                const expected = m.cold('a', {
                    a: createTransactionSuccess({ transaction: [] as any })
                });

                await m
                    .expect(effect.createTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.createTransaction).toHaveBeenCalledWith({});
            })
        );

        it(
            'can handle transaction creation fetching errors',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: createTransaction({ transaction: {} as any })
                });

                serviceSpy.createTransaction.and.returnValue(
                    m.cold('#', { a: new Error('error') })
                );
                const expected = m.cold('a', {
                    a: createTransactionFailed({ message: 'error' })
                });

                await m
                    .expect(effect.createTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.createTransaction).toHaveBeenCalledWith({});
            })
        );
    });

    describe('updateTransaction', () => {
        it(
            'can update a  transaction',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: updateTransaction({
                        id: 'testId',
                        transaction: {} as any
                    })
                });

                serviceSpy.updateTransaction.and.returnValue(
                    m.cold('a', { a: [] })
                );
                const expected = m.cold('a', {
                    a: updateTransactionSuccess({ transaction: [] as any })
                });

                await m
                    .expect(effect.updateTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.updateTransaction).toHaveBeenCalledWith(
                    'testId',
                    {}
                );
            })
        );

        it(
            'can handle transaction update errors',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: updateTransaction({
                        id: 'testId',
                        transaction: {} as any
                    })
                });

                serviceSpy.updateTransaction.and.returnValue(
                    m.cold('#', { a: new Error('error') })
                );
                const expected = m.cold('a', {
                    a: updateTransactionFailed({ message: 'error' })
                });

                await m
                    .expect(effect.updateTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.updateTransaction).toHaveBeenCalledWith(
                    'testId',
                    {}
                );
            })
        );
    });

    describe('deleteTransaction', () => {
        it(
            'can delete a transaction',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: deleteTransaction({ transactionId: 'testId' })
                });

                serviceSpy.deleteTransaction.and.returnValue(
                    m.cold('a', { a: [] })
                );
                const expected = m.cold('a', {
                    a: deleteTransactionSuccess()
                });

                await m
                    .expect(effect.deleteTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.deleteTransaction).toHaveBeenCalledWith(
                    'testId'
                );
            })
        );

        it(
            'can handle transaction deletion errors',
            marbles(async m => {
                actions$ = m.cold('a', {
                    a: deleteTransaction({ transactionId: 'testId' })
                });

                serviceSpy.deleteTransaction.and.returnValue(
                    m.cold('#', { a: new Error('error') })
                );
                const expected = m.cold('a', {
                    a: deleteTransactionFailed({ message: 'error' })
                });

                await m
                    .expect(effect.deleteTransaction$)
                    .toBeObservable(expected);

                expect(serviceSpy.deleteTransaction).toHaveBeenCalledWith(
                    'testId'
                );
            })
        );
    });
});
