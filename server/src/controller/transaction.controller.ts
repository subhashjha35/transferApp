import crypto from 'crypto';
import { Transaction, TransactionResponse } from './../model/transaction.model';
import transactionData from './../shared/data/transactions.json';

import { Body, Delete, Get, Post, Put, Route, Tags } from "tsoa";
@Tags('Transaction')
@Route('/api/transaction')
export default class TransactionController {
    data = transactionData;

    @Get('/getAll')
    public async getAllTransactions(): Promise<TransactionResponse[]> {
        return this.data;
    }

    @Post('/')
    public async createTransaction(@Body() record: Transaction): Promise<TransactionResponse> {
        const id = crypto.randomBytes(8).toString();
        const newRecord = { ...record, id };
        this.data.push(newRecord);
        return newRecord;
    }

    @Put('/:id')
    public async updateTransaction(id: string, @Body() data: Transaction): Promise<TransactionResponse> {
        const filteredData = this.data.filter(data => data.id !== id);
        this.data = filteredData;
        const updatedData = { ...data, id };
        this.data.push({ id, ...data });
        return updatedData;
    }
    
    @Delete('/:id')
    public async deleteTransaction(id: string): Promise<void> {
        const filteredData = this.data.filter(data => data.id !== id);
        this.data = filteredData;
		throw new Error('The Record does not exist');
    }
}