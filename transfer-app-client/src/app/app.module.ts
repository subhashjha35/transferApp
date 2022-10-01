import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionEffects } from './effects/transaction.effects';
import { metaReducers, reducers } from './reducers';
import { TransactionService } from './services';

@NgModule({
    declarations: [AppComponent, TransactionFormComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionTypeUniqueness: true,
            },
        }),
        EffectsModule.forRoot([TransactionEffects]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        TransactionService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
