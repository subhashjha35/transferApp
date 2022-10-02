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
    updateTransaction,
    updateTransactionSuccess
} from 'src/app/actions/transaction.actions';
import { TransactionFormComponent } from 'src/app/components/transaction-form/transaction-form.component';
import { getAllTransactions } from 'src/app/reducers';
import { TransactionResponse } from 'src/app/services/model/transactionResponse';

@Component({
    selector: 'app-transaction-page',
    templateUrl: 'transaction.page.html',
    styleUrls: ['transaction.page.scss']
})
export class TransactionPage implements OnInit, OnDestroy {
    data: TransactionResponse[];
    filteredData: TransactionResponse[];
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
            .subscribe(transactions => {
                this.data = transactions;
                this.filteredData = this.data;
            });
    }

    async editTransaction(e: Event, transaction: TransactionResponse) {
        e.stopPropagation();

        const modal = await this.modalCtrl.create({
            component: TransactionFormComponent,
            componentProps: { transaction }
        });

        modal.present();
        const { data, role } = await modal.onWillDismiss();
        if (role === 'save') {
            this.store.dispatch(
                updateTransaction({ id: transaction.id, transaction: data })
            );
        }
    }

    async createTransaction() {
        const modal = await this.modalCtrl.create({
            component: TransactionFormComponent
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
                    }
                },
                {
                    text: 'Yes',
                    role: 'confirm',
                    handler: () => {
                        this.alertControl.dismiss(null, 'confirm');
                    }
                }
            ]
        });
        alert.present();
        const { role } = await alert.onWillDismiss();
        if (role === 'confirm') {
            this.store.dispatch(deleteTransaction({ transactionId: id }));
        }
    }

    searchTransaction(e: any) {
        const searchStr = (e.target.value as string).toLowerCase();
        if (!!searchStr) {
            this.filteredData = this.data.filter(
                rec =>
                    rec.account_holder.toLowerCase().includes(searchStr) ||
                    rec.amount.toLowerCase().includes(searchStr) ||
                    rec.iban.toLowerCase().includes(searchStr) ||
                    rec.note.toLowerCase().includes(searchStr)
            );
        } else {
            this.filteredData = this.data;
        }
    }

    sortBy(e: any) {
        const col = e.target.value;
        if (!!e.target.value) {
            this.filteredData = this.filteredData
                .slice()
                .sort((a, b) => (a[col] as string).localeCompare(b[col]));
        } else {
            this.filteredData = this.filteredData
                .slice()
                .sort((a, b) =>
                    a.account_holder.localeCompare(b.account_holder)
                );
        }
    }

    ngOnDestroy() {
        this.componentDestroyed.complete();
    }
}
