/**
 * @tsoaModel
 */
export interface Transaction {
    account_holder: string;
    iban: string;
    date: string;
    amount: string;
    note: string;
}

/**
 * @tsoaModel
 */
export interface TransactionResponse extends Transaction {
    id: string;
}