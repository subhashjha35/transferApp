import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularIbanModule, IbanFormatterPipe } from 'angular-iban';
import { TransactionPage } from './transaction.page';

import { TransactionRoutingModule } from './transaction.routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TransactionRoutingModule,
        AngularIbanModule,
    ],
    declarations: [TransactionPage],
    providers: [IbanFormatterPipe],
})
export class TransactionModule {}
