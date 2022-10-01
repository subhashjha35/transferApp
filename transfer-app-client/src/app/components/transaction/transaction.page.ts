import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    createTransaction,
    deleteTransaction,
    deleteTransactionSuccess,
    listTransactions,
} from 'src/app/actions/transaction.actions';
import { getAllTransactions } from 'src/app/reducers';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import {
    updateTransaction,
    updateTransactionSuccess,
} from './../../../../../client/src/app/actions/transaction.actions';
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
    styleUrls: ['transaction.page.scss'],
})
export class TransactionPage implements OnInit, OnDestroy {
    data: TransactionResponse[];
    private componentDestroyed = new Subject();

    constructor(
        private alertControl: AlertController,
        private modalCtrl: ModalController,
        private store: Store,
        private actions$: ActionsSubject
    ) {}

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
        this.store
            .select(getAllTransactions)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(transactions => (this.data = transactions));
    }

    async editTransaction(e: Event, transaction: TransactionResponse) {
        e.stopPropagation();

        const modal = await this.modalCtrl.create({
            component: TransactionFormComponent,
            componentProps: { transaction },
        });

        modal.present();

        const { data, role } = await modal.onWillDismiss();
        console.log(data, role);
        if (role === 'save') {
            this.store.dispatch(
                updateTransaction({ id: transaction.id, transaction: data })
            );
        }
    }

    async createTransaction() {
        const modal = await this.modalCtrl.create({
            component: TransactionFormComponent,
        });

        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'save') {
            this.store.dispatch(createTransaction({ transaction: data }));
        }
    }

    async deleteTransaction(e: Event, id: string) {
        e.stopPropagation();
        // const modal = await this.modalCtrl.dismiss;
        const alert = await this.alertControl.create({
            header: 'Confirm Deletion',
            subHeader: `${id}`,
            message: 'Are you sure to delete this transaction',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.alertControl.dismiss(null, 'cancel');
                    },
                },
                {
                    text: 'Yes',
                    role: 'confirm',
                    handler: () => {
                        this.alertControl.dismiss(null, 'confirm');
                        this.store.dispatch(
                            deleteTransaction({ transactionId: id })
                        );
                    },
                },
            ],
        });

        alert.present();
        const { role } = await alert.onWillDismiss();
        console.log(role);
        if (role === 'confirm') {
            console.log('confirmed');
            this.store.dispatch(deleteTransaction({ transactionId: id }));
        }
    }

    ngOnDestroy() {
        this.componentDestroyed.complete();
    }
}
