import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createTransaction, deleteTransactionSuccess, listTransactions } from 'src/app/actions/transaction.actions';
import { getAllTransactions } from 'src/app/reducers';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { updateTransaction, updateTransactionSuccess } from './../../../../../client/src/app/actions/transaction.actions';
import { TransactionResponse } from './../../../../../client/src/app/services/model/transactionResponse';

export interface Transaction {
  account_holder: string;
  iban: string;
  date: string;
  amount: string;
  note: string;
}

@Component({
  selector: 'app-transaction-page',
  templateUrl: 'transaction.page.html',
  styleUrls: ['transaction.page.scss']
})
export class TransactionPage implements OnInit, OnDestroy {
  data: Transaction[];
  private componentDestroyed = new Subject();

  constructor(private modalCtrl: ModalController, private store: Store, private actions$: ActionsSubject) { }

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(deleteTransactionSuccess, updateTransactionSuccess),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(() => {
        this.store.dispatch(listTransactions());
      });
    this.store.dispatch(listTransactions());
    this.store.select(getAllTransactions).pipe(
      takeUntil(this.componentDestroyed)
    ).subscribe(transactions => this.data = transactions);
  }

  async editTransaction(e: Event, transaction: TransactionResponse) {
    e.stopPropagation();

    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent,
      componentProps: {transaction}
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.store.dispatch(updateTransaction({ id: transaction.id, transaction: data }))
    }
  }

  async createTransaction() {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.store.dispatch(createTransaction({ transaction: data }))
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.complete();
  }

}
