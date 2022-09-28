import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TransactionEffects } from './effects/transaction.effects';
import { metaReducers } from './reducers/index';
import { TransactionService } from './services/api/transaction.service';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([TransactionEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
