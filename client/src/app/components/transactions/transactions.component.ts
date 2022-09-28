import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { deleteTransaction, deleteTransactionSuccess, listTransactions } from './../../actions/transaction.actions';

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
    this.actions$.pipe(
      ofType(deleteTransactionSuccess),
      takeUntil(this.componentDestroyed)
    ).subscribe(() => {
      this.store.dispatch(listTransactions());
    })
  }

  deleteTransaction() {
    this.store.dispatch(deleteTransaction({ transactionId: 'random_number1' }))
  }

  ngOnDestroy(): void {
    this.componentDestroyed.unsubscribe();
  }

}
