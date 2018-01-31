import { RequestService } from './../../util/request.service';
import { ChartData } from './../model/chart-data';
import { Chart } from './../model/chart';
import { Transaction } from './../../transactions/transaction';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';


@Injectable()
export class ChartService {

  private chartUrl = 'expenses/transactions/chart';

  private chartData: ChartData[];

  private defaultChart: Chart;

  constructor(private requestService: RequestService) {
  }

  getChartUrl(categoryId: number, period: string): string {
    let params = categoryId ? `?category=${categoryId}` : '';
    if (period) {
      params = params.length > 0 ? params + '&period=' + period : params + '?period=' + period;
    }
    return this.chartUrl + params;
  }

  getChart(categoryId: number, period: string): Promise<Chart> {
    return this.requestService.get(this.getChartUrl(categoryId, period));
  }

  getDefaultData(): ChartData[] {
    this.prepareDefaultData();
    return [{ data: [], label: '' }, { data: [], label: '' }];
  }

  private prepareDefaultData(): void {
    if (this.defaultChart === undefined) {
      this.defaultChart = new Chart();
      this.defaultChart.chartData = [{ data: [], label: '' }, { data: [], label: '' }];
    }
  }
}
