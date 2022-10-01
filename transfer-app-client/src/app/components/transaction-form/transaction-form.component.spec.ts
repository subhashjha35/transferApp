import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
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
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
    let spectator: Spectator<TransactionFormComponent>;
    let component: TransactionFormComponent;

    let modalCtrlSpy: SpyObject<ModalController>;
    let store: MockStore;
    const createComponent = createComponentFactory<TransactionFormComponent>({
        component: TransactionFormComponent,
        imports: [],
        declarations: [
            MockComponents(
                IonHeader,
                IonInput,
                IonTextarea,
                IonLabel,
                IonItem,
                IonDatetime,
                IonContent,
                IonButtons,
                IonButton,
                IonToolbar,
                IonTitle
            ),
        ],
        providers: [
            provideMockStore({}),
            mockProvider(ModalController),
        ],
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        modalCtrlSpy = spectator.inject(
            ModalController
        ) as SpyObject<ModalController>;
    });

    describe('onInit', () => {
        it('should define the form values', () => {
            expect(component.transactionForm).toBeTruthy();
            const formValues = component.transactionForm.value;
            expect(Object.values(formValues).every(v => v === '')).toBe(true);
        });
    });

    describe('onInit with transaction value', () => {
        beforeEach(() => {
            component.transaction = {
                account_holder: 'aaa',
                iban: 'iban123',
                note: 'test notes',
                amount: '1234',
                date: '11/01/2021',
            };
            // spectator.fixture.detectChanges();
        });

        it('should initialize form values', () => {
            component.ngOnInit();
            expect(component.transactionForm.value).toEqual(
                component.transaction
            );
        });
    });

    describe('cancel()', () => {
        it('should call the modalControl dismiss method with cancel', () => {
            component.cancel();
            expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(null, 'cancel');
        });
    });

    describe('formatDate()', () => {
        it('should format the date to dd-MM-yyyy', () => {
            expect(
                component.formatDate(
                    new Date('2022-10-04T02:06:00+05:30'),
                    'dd-MM-yyyy'
                )
            ).toEqual('04-10-2022');
        });
    });

    describe('save()', () => {
        describe('save()', () => {
            let transactionData;
            beforeEach(() => {
                transactionData = {
                    account_holder: 'aaa',
                    iban: 'iban123',
                    note: 'test notes',
                    amount: '1234',
                    date: '11-01-2021',
                };
                spyOn(component, 'formatDate').and.returnValue('2021-11-01');
            });

            it('should call formatDate method', () => {
                component.transactionForm.setValue(transactionData);
                component.save();
                expect(component.formatDate).toHaveBeenCalledWith(
                    '11-01-2021' as any,
                    'yyyy-MM-dd'
                );
            });

            it('should call modalCtrl.dismiss method', () => {
                const expected = {
                    ...transactionData,
                    date: '2021-11-01',
                };
                component.transactionForm.setValue(transactionData);
                spectator.detectChanges();
                component.save();
                expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(
                    expected,
                    'save'
                );
            });
        });
    });
});
