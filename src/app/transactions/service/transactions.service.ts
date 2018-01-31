import { RequestService } from './../../util/request.service';
import { Category } from './../../categories/category';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http/Http';
import { Router } from '@angular/router';

import { Transaction } from './../transaction';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

    private allTransactionsUrl = 'expenses/transactions';

    private uploadUrl = 'expenses/upload';

    private getTransactionsUrl(id: number): string {
        return `expenses/categories/${id}/transactions`;
    }

    private getSearchUrl(categoryid: number, term: string): string {
         return `search/transactions/categories/${categoryid}/search?description=${term}`;
    }

    private getExpensesSearchUrl(id: number, idToadd: number, desc: string) {
        return `expenses/categories/${id}/search?desc=${desc}&categoryToAddId=${idToadd}`;
    }

    constructor(private requestService: RequestService) {
    }

    uploadTransactions(event: any): Promise<void> {
        return this.requestService.upload(this.uploadUrl, event.target.files);
    }

    getTransactions(category: Category): Promise<Transaction[]> {
        return this.requestService.get(this.getTransactionsUrl(category.id));
    }

    deleteAllTransactions():  Promise<void> {
        return this.requestService.delete(this.allTransactionsUrl);
    }

    moveTransactionsToCategory(id: number, transactionsIds: Array<number>): Promise<void> {
        return this.requestService.put(this.getTransactionsUrl(id), JSON.stringify(transactionsIds), true);
    }

    search(id: number, term: string): Observable<Transaction[]> {
        return Observable.fromPromise(this.requestService.get(this.getSearchUrl(id, term)));
    }

    searchAndMoveTransactions(id: number, categoryToMove: number, desc: string): Promise<void> {
        return this.requestService.put(this.getExpensesSearchUrl(id, categoryToMove, desc), null, true);
    }
}
