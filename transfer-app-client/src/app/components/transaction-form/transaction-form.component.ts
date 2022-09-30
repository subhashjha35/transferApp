import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
  @Input() transaction: Transaction;

  name: string;
  transactionForm: FormGroup;
  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    return this.modalCtrl.dismiss(this.name, 'save');
  }
  ngOnInit() {
    this.transactionForm = new FormGroup({
      'account_holder': new FormControl(this.transaction.account_holder, Validators.required),
      'amount': new FormControl(this.transaction.amount, Validators.required),
      'date': new FormControl(this.transaction.date, Validators.required),
      'iban': new FormControl(this.transaction.iban, Validators.required),
      'note': new FormControl(this.transaction.note)
    })

    this.transactionForm.updateValueAndValidity();
  }

}
