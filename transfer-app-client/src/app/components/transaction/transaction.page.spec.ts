import { TestBed } from '@angular/core/testing';
import {
    AlertController,
    IonAccordion,
    IonAccordionGroup,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonRow,
    IonTitle,
    IonToolbar,
    ModalController
} from '@ionic/angular';
import {
    createComponentFactory,
    mockProvider,
    Spectator,
    SpyObject
} from '@ngneat/spectator';
import { marbles } from 'rxjs-marbles';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { LOCALE_ID } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AngularIbanModule } from 'angular-iban';
import { MockComponents } from 'ng-mocks';
import {
    createTransaction,
    deleteTransaction,
    listTransactions,
    updateTransaction
} from 'src/app/actions/transaction.actions';
import { AppState } from 'src/app/reducers';
import { TransactionPage } from './transaction.page';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

const transactionsData = [
    {
        account_holder: 'sfasdf',
        amount: '23434234',
        date: '2022-10-04',
        iban: 'ES9121000418450200051332',
        note: 'sdasdfasdfasdf',
        id: '1ff15a27cb28b088'
    },
    {
        account_holder: 'ewerqewr',
        amount: '212312',
        date: '06-09-2022',
        iban: 'IT60X0542811101000000123456',
        note: 'sdadf sdfasdf',
        id: 'cbe414c29366bdd4'
    }
];
const initialState: AppState = {
    transactions: {
        list: transactionsData,
        isLoaded: true,
        isLoading: false
    }
};

describe('TransactionPage', () => {
    let spectator: Spectator<TransactionPage>;
    let component: TransactionPage;

    let store: MockStore<any>;
    let dispatchSpy: jasmine.Spy;

    let modalControllerSpy: SpyObject<ModalController>;
    let alertControllerSpy: SpyObject<AlertController>;
    const createComponent = createComponentFactory<TransactionPage>({
        component: TransactionPage,
        imports: [AngularIbanModule],
        declarations: [
            MockComponents(
                IonToolbar,
                IonTitle,
                IonAccordion,
                IonAccordionGroup,
                IonFabButton,
                IonIcon,
                IonFab,
                IonHeader,
                IonContent,
                IonGrid,
                IonRow,
                IonCol,
                IonItem
            )
        ],
        providers: [
            provideMockStore({ initialState }),
            mockProvider(ModalController),
            mockProvider(AlertController),
            { provide: LOCALE_ID, useValue: 'de-DE' }
        ]
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        store = TestBed.inject(Store) as MockStore<any>;
        dispatchSpy = spyOn(store, 'dispatch');
        modalControllerSpy = spectator.inject(
            ModalController
        ) as SpyObject<ModalController>;
        alertControllerSpy = spectator.inject(
            AlertController
        ) as SpyObject<AlertController>;
    });

    afterAll(() => {
        spectator.fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('OnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
            spectator.detectChanges();
        });
        afterEach(() => {
            spectator.fixture.destroy();
        });

        it('should call the listTransaction action', () => {
            expect(store.dispatch).toHaveBeenCalledWith(listTransactions());
        });
        it('should set the transactions from store', () => {
            expect(component.data).toEqual(transactionsData);
        });

        it(
            'should dispatch listTransactions after update or delete',
            marbles(m => {
                const actionsSubject = spectator.inject(
                    ActionsSubject
                ) as ActionsSubject;
                actionsSubject.next(
                    updateTransaction({ id: 'dummy', transaction: {} as any })
                );
                spectator.detectChanges();
                expect(dispatchSpy).toHaveBeenCalledWith(listTransactions());
            })
        );
    });

    describe('createTransaction', () => {
        it('should contain dispatch the createTransaction action', async () => {
            modalControllerSpy.create.and.returnValue({
                present: () => {},
                onWillDismiss: () => ({
                    data: transactionsData[0],
                    role: 'save'
                })
            });

            await component.createTransaction();
            expect(store.dispatch).toHaveBeenCalledWith(
                createTransaction({ transaction: transactionsData[0] })
            );
        });
    });

    describe('deleteTransaction', () => {
        it('should contain dispatch the deleteTransaction action', async () => {
            alertControllerSpy.create.and.returnValue({
                create: () => {},
                present: () => {},
                onWillDismiss: () => ({ data: null, role: 'confirm' })
            });

            const event = new MouseEvent('click');
            await component.deleteTransaction(event, transactionsData[0].id);
            expect(dispatchSpy).toHaveBeenCalledWith(
                deleteTransaction({ transactionId: transactionsData[0].id })
            );
        });
    });

    describe('updateTransaction', () => {
        it('should contain dispatch the updateTransaction action', async () => {
            const data = {
                account_holder: 'sfasdf',
                amount: '23434234',
                date: '2022-10-04',
                iban: 'ES9121000418450200051332',
                note: 'sdasdfasdfasdf',
                id: '1ff15a27cb28b088'
            };
            modalControllerSpy.create.and.returnValue({
                create: () => {},
                present: () => {},
                onWillDismiss: () => ({ data, role: 'save' })
            });

            const event = new MouseEvent('click');
            await component.editTransaction(event, transactionsData[0]);
            expect(dispatchSpy).toHaveBeenCalledWith(
                updateTransaction({ id: data.id, transaction: data })
            );
        });
    });

    describe('sortBy()', () => {
        it('should sort the transaction', () => {
            component.filteredData = [
                {
                    account_holder: 'name1',
                    amount: '1234',
                    date: '2022-10-04',
                    note: 'This is note 1'
                },
                {
                    account_holder: 'name2',
                    amount: '1233',
                    date: '2022-10-04',
                    note: 'This is note 2'
                },
                {
                    account_holder: 'name3',
                    amount: '23233',
                    date: '2022-10-04',
                    note: 'This is note 2'
                }
            ] as any;

            const expected = [
                {
                    account_holder: 'name2',
                    amount: '1233',
                    date: '2022-10-04',
                    note: 'This is note 2'
                },
                {
                    account_holder: 'name1',
                    amount: '1234',
                    date: '2022-10-04',
                    note: 'This is note 1'
                },
                {
                    account_holder: 'name3',
                    amount: '23233',
                    date: '2022-10-04',
                    note: 'This is note 2'
                }
            ] as any;
            spectator.detectChanges();
            let event = { target: { value: 'amount' } };
            component.sortBy(event);
            expect(component.filteredData).toEqual(expected);

            event = { target: { value: '' } };
            component.sortBy(event);
            expect(component.filteredData).toEqual(component.filteredData);
        });
    });

    describe('searchTransaction', () => {
        it('should filter the transaction based on search string', () => {
            component.data = [
                {
                    account_holder: 'sfasdf',
                    amount: '23434234',
                    date: '2022-10-04',
                    iban: 'ES9121000418450200051332',
                    note: 'This is note 1',
                    id: '1ff15a27cb28b088'
                },
                {
                    account_holder: 'sfasdf',
                    amount: '23434234',
                    date: '2022-10-04',
                    iban: 'ES9121000418450200051332',
                    note: 'This is note 2',
                    id: '1ff15a27cb28b088'
                }
            ];

            const expected = [
                {
                    account_holder: 'sfasdf',
                    amount: '23434234',
                    date: '2022-10-04',
                    iban: 'ES9121000418450200051332',
                    note: 'This is note 2',
                    id: '1ff15a27cb28b088'
                }
            ];
            component.searchTransaction({ target: { value: 'note 2' } });
            expect(component.filteredData).toEqual(expected);
            component.searchTransaction({ target: { value: '' } });
            expect(component.filteredData).toEqual(component.data);
        });
    });
});
