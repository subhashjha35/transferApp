import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

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
export class TransactionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  data: Transaction[];

  ngOnInit(): void {
    fetch('../../assets/transactions.json').then(t => t.json()).then(data => this.data = data)
  }

  async editTransaction(e: Event, transaction: Transaction) {
    e.stopPropagation();

    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent,
      componentProps: {transaction}
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {

    }
  }

  async createTransaction() {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {

    }
  }

}
