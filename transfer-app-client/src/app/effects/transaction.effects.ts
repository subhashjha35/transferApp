import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionService } from '../services/api/transaction.service';
import * as transactionActions from './../actions/transaction.actions';
import { parseErrorMessage } from './../helpers/error-message.parser';

@Injectable()
export class TransactionEffects {
    listTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.listTransactions),
            switchMap(action =>
                this.service.getAllTransactions().pipe(
                    map(transactions =>
                        transactionActions.listTransactionsSuccess({
                            transactions,
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of<Action>(
                            transactionActions.listTransactionsFailed({
                                message: parseErrorMessage(error),
                            })
                        )
                    )
                )
            )
        )
    );

    createTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.createTransaction),
            switchMap(action =>
                this.service.createTransaction(action.transaction).pipe(
                    map(transaction =>
                        transactionActions.createTransactionSuccess({
                            transaction,
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of<Action>(
                            transactionActions.createTransactionFailed({
                                message: parseErrorMessage(error),
                            })
                        )
                    )
                )
            )
        )
    );

    updateTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.updateTransaction),
            switchMap(action =>
                this.service
                    .updateTransaction(action.id, action.transaction)
                    .pipe(
                        map(transaction =>
                            transactionActions.updateTransactionSuccess({
                                transaction,
                            })
                        ),
                        catchError((error: HttpErrorResponse) =>
                            of<Action>(
                                transactionActions.updateTransactionFailed({
                                    message: parseErrorMessage(error),
                                })
                            )
                        )
                    )
            )
        )
    );

    deleteTransaction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(transactionActions.deleteTransaction),
            switchMap(action =>
                this.service.deleteTransaction(action.transactionId).pipe(
                    map(() => transactionActions.deleteTransactionSuccess()),
                    catchError((error: HttpErrorResponse) =>
                        of<Action>(
                            transactionActions.deleteTransactionFailed({
                                message: parseErrorMessage(error),
                            })
                        )
                    )
                )
            )
        )
    );

  constructor(
    private actions$: Actions,
    private service: TransactionService
  ) { }
}
