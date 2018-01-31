import { AuthComponent } from './authorization/auth/auth.component';
import { RegisterComponent } from './authorization/register/register.component';
import { TransactionChartComponent } from './transaction-chart/transaction-chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryDetailComponent } from './categories/details/category-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChartsComponent } from './charts/charts.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { AuthGuard } from './authorization/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detail/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionTableComponent, canActivate: [AuthGuard] },
  { path: 'charts', component : TransactionChartComponent, canActivate: [AuthGuard]},
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
