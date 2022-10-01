import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ValidatorService } from 'angular-iban';

export interface Transaction {
    account_holder: string;
    iban: string;
    date: string;
    amount: string;
    note: string;
}

@Component({
    selector: 'app-transaction-form',
    templateUrl: './transaction-form.component.html',
    styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
    @Input() transaction: Transaction = undefined;

    name: string;
    transactionForm: FormGroup;
    constructor(private modalCtrl: ModalController) {}

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    formatDate(date: Date, format: string) {
        const pipe = new DatePipe('en-US');
        return pipe.transform(date, format);
    }

    save() {
        const formValues = {
            ...this.transactionForm.value,
            date: this.formatDate(
                this.transactionForm.get('date').value,
                'yyyy-MM-dd'
            ),
        };
        return this.modalCtrl.dismiss(formValues, 'save');
    }

    ngOnInit() {
        this.transactionForm = new FormGroup({
            account_holder: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            iban: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    ValidatorService.validateIban,
                ])
            ),
            note: new FormControl(''),
        });

        if (!!this.transaction) {
            this.transactionForm
                .get('account_holder')
                .setValue(this.transaction.account_holder);
            this.transactionForm
                .get('amount')
                .setValue(this.transaction.amount);
            this.transactionForm.get('date').setValue(this.transaction.date);
            this.transactionForm.get('iban').setValue(this.transaction.iban);
            this.transactionForm.get('note').setValue(this.transaction.note);
        }
    }
}
