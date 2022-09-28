import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { TransactionService } from '../services/api/transaction.service';
import * as transactionActions from './../actions/transaction.actions';

@Injectable()
export class TransactionEffects {
  constructor(private actions$: Actions, private service: TransactionService) { }

  listTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.listTransactions),
      switchMap(action =>
        this.service.getAllTransactions().pipe(
          map(transactions => transactionActions.listTransactionsSuccess({ transactions })),
          catchError((error: HttpErrorResponse) => of<Action>(transactionActions.listTransactionsFailed({ message: error.message })))
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.createTransaction),
      switchMap(action =>
        this.service.createTransaction(action.transaction).pipe(
          map(transaction =>transactionActions.createTransactionSuccess({ transaction })),
          catchError((error: HttpErrorResponse) => of<Action>(transactionActions.createTransactionFailed({ message: error.message })))
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.updateTransaction),
      switchMap(action =>
        this.service.updateTransaction(action.id, action.transaction).pipe(
          map(transaction => transactionActions.updateTransactionSuccess({ transaction })),
          catchError((error: HttpErrorResponse) => of<Action>(transactionActions.updateTransactionFailed({ message: error.message })))
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
          catchError((error: HttpErrorResponse) => of<Action>(transactionActions.deleteTransactionFailed({ message: error.message })))
        )
      )
    )
  );
}
