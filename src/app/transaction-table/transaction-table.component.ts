import { ChartData } from './../charts/model/chart-data';
import { TransactionTableService } from './service/transaction-table.service';
import { Category } from './../categories/category';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'expenses',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.css'],
    providers: [TransactionTableService]
})
export class TransactionTableComponent {

    public category: Category;
    public categories: Category[];

    public constructor(private transactionTableService: TransactionTableService) {
        transactionTableService.category$.subscribe(
           category => {
               this.category = category;
           }
        )

        transactionTableService.categories$.subscribe(
            categories => {
                this.categories = categories;
            }
        )
    }
}
