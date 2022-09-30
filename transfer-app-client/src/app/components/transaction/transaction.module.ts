import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransactionPage } from './transaction.page';

import { TransactionRoutingModule } from './transaction.routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionRoutingModule
  ],
  declarations: [TransactionPage]
})
export class TransactionModule {}
