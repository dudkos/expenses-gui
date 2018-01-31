import { ChartService } from './../charts/service/charts.service';
import { ChartData } from './../charts/model/chart-data';
import { Category } from './../categories/category';
import { TransactionTableService } from './../transaction-table/service/transaction-table.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-transaction-charts',
    templateUrl: './transaction-chart.component.html',
    styleUrls: ['./transaction-chart.component.css'],
    providers: [TransactionTableService]
})
export class TransactionChartComponent {

    public category: Category;

    public constructor(private transactionTableService: TransactionTableService) {
        transactionTableService.category$.subscribe(
           category => {
               this.category = category;
           }
        );
    }
}
