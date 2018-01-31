import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChartData } from './model/chart-data';
import { ChartService } from './service/charts.service';
import { Category } from './../categories/category';

import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { log } from 'util';

@Component({
  selector: 'app-my-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  @Input() category: Category;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private period = 'byMonth';

  constructor(private chartService: ChartService, private router: Router) {
    this.getCalculation(undefined);
  }

  public lineChartData: Array<any> = this.chartService.getDefaultData();
  public lineChartLabels: Array<any> = Array<any>();

  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && this.category !== undefined) {
      this.getCalculation(this.category.id);
    }
  }

  getCalculation(categoryId: number): void {
    if (categoryId === undefined) {
      this.category = undefined;
    }
    this.chartService.getChart(categoryId, this.period).then(chart => {
      this.lineChartData = chart.chartData;
      this.lineChartLabels = chart.labels;
      this.chart.labels = chart.labels;
      this.chart.ngOnInit();
    });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  gotoTransactions() {
    this.router.navigate(['/transactions']);
  }

  changePeriod(): void {
    this.period = this.period === 'byAll' ? 'byMonth' :
      (this.period === 'byYear' ? 'byAll' : 'byYear');
    this.getCalculation(this.category ? this.category.id : null);
  }

  getPeriodButtonText(): string {
    return this.period === 'byAll' ? 'By All' :
      (this.period === 'byYear' ? 'By Year' : 'By Month');
  }
}


