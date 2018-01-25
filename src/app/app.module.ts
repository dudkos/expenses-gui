import { ChartService } from './charts/service/charts.service';
import { RequestService } from './util/request.service';
import { TransactionTableService } from './transaction-table/service/transaction-table.service';
import { CategoryService } from './categories/service/category.service';
import { TransactionService } from './transactions/service/transactions.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './authorization/service/authentication.service';
import { AlertService } from './alert/service/alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './authorization/auth/auth.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './authorization/register/register.component';
import { AuthGuard } from "./authorization/auth.guard";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryDetailComponent } from './categories/details/category-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ChartsComponent } from './charts/charts.component';
import { TransactionChartComponent } from './transaction-chart/transaction-chart.component';
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AlertComponent,
    RegisterComponent,
    TransactionsComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoriesComponent,
    TransactionTableComponent,
    TransactionsComponent,
    ChartsComponent,
    TransactionChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TableModule,
    HttpModule,
    ChartsModule
  ],
  providers: [AuthenticationService, AlertService, AuthGuard, CategoryService, TransactionService, TransactionTableService, RequestService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
