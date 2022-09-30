import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  createTransaction,
  deleteTransaction,
  deleteTransactionSuccess,
  listTransactions
} from './../../actions/transaction.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  constructor(private store: Store, private actions$: ActionsSubject) { }

  ngOnInit(): void {
    this.store.dispatch(listTransactions());
    this.actions$
      .pipe(
        ofType(deleteTransactionSuccess),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(() => {
        this.store.dispatch(listTransactions());
      });
  }

  deleteTransaction() {
    this.store.dispatch(deleteTransaction({ transactionId: 'random_number1' }));
  }

  createTransaction() {
    const transactionData = JSON.parse(
      `{
		"account_holder": "Steven Ralph",
		"iban": "123 124 34234 234",
		"amount": "1,424,000.00",
		"date": "2014-03-12",
		"note": "This is a large deposit for saving purpose"
	}`
    );

    this.store.dispatch(createTransaction({ transaction: transactionData }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed.unsubscribe();
  }
}
