import { Router } from '@angular/router';
import { Category } from './../categories/category';
import { TransactionService } from './service/transactions.service';
import { Transaction } from './transaction';

import { Component, Input, SimpleChanges, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'my-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  @Input() category: Category;
  @Input() categories: Category[];

  @ViewChild('txTab')
  private elTxTab: ElementRef;

  @ViewChild('searchBox')
  private elSerchBox: ElementRef;

  subscription: Subscription;

  public isShown: boolean = false;

  public isDropShown: boolean = false;

  private lastTerm: string;

  public isTransactionsPresented: boolean = false;

  public selectedTransactionIds: Array<number> = [];

  public rows: Array<any> = [];

  private selectAllButtonText = 'Select All'

  public columns: Array<any> = [
    { title: 'Date', name: 'transactionDate', sort: false },
    { title: 'Account', name: 'accountNumber', sort: false },
    { title: 'Description', name: 'description', sort: false },
    { title: 'Amount', name: 'amount' },
    { title: 'CUR', name: 'currencyCode' }
  ];

  public config: any = {
  };

  transactions: Observable<Transaction[]>;
  private searchTerms = new Subject<string>();

  public constructor(private transactionService: TransactionService, private renderer: Renderer2, private router: Router) {
  }

  search(term: string): void {
    this.lastTerm = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.transactions = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.transactionService.search(this.category.id, term)
        : Observable.of<Transaction[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Transaction[]>([]);
      });
  }

  uploadTransactions(category: Category, event: any): void {
    this.transactionService.uploadTransactions(event)
      .then(() => this.getTransactions(this.category));
  }

  getTransactions(category: Category): void {
    this.transactionService.getTransactions(category)
      .then(transactions => {
        this.resetSearchResults();
        this.rows = transactions;
        this.setSTransactionPresented(transactions.length > 0);
      });
  }

  deleteAll(): void {
    this.transactionService.deleteAllTransactions()
      .then(transactions => {
        this.rows = [];
      });
  }

  selectOrDeselectAll(): void {
    this.getSelectAllButtonText() === 'Select All' ?
      this.sellectAll() : this.deselectAll();
  }

  deselectAll(): void {
    this.getTransactionTableTrs().forEach(element => this.renderer.removeClass(element, 'selected'));
    this.selectedTransactionIds = [];
    this.selectAllButtonText = 'Select All';
  }

  sellectAll(): void {
    this.getTransactionTableTrs().forEach(element => this.renderer.addClass(element, 'selected'));
    this.selectedTransactionIds = [];
    this.rows.forEach(row => {
      this.selectedTransactionIds.push(row.id);
    });
    this.selectAllButtonText = 'Deselect All';
  }

  private getTransactionTableTrs(): Array<any> {
    return Array.from(this.elTxTab.nativeElement.querySelector('tbody').children);
  }

  getSelectAllButtonText(): string {
    return this.selectAllButtonText;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.getTransactions(this.category);
      this.selectedTransactionIds = [];
    }
  }

  onCellClick(data: any): any {
    this.moveOrRemoveFromSelectedTransactions(data.row.id);
  }

  selectSerchedTransaction(event: any, id: number) {
    this.moveOrRemoveFromSelectedTransactions(id);
    event.target.classList.toggle('selected');
  }

  moveOrRemoveFromSelectedTransactions(id: number) {
    let index: number = this.selectedTransactionIds.indexOf(id);
    if (index !== -1) {
      this.selectedTransactionIds.splice(index, 1);
    } else {
      this.selectedTransactionIds.push(id);
    }
  }

  selectTransaction(event: any) {
    if (event.target.tagName === "TD") {
      event.target.parentElement.classList.toggle('selected');
    }
  }

  moveTransactionsToCategory(category: Category): void {
    if (this.selectedTransactionIds.length > 0) {
      this.transactionService.moveTransactionsToCategory(category.id, this.selectedTransactionIds)
        .then(() => {
          this.resetSearchResults();
        })
    }
  }

  searchAndMoveTransactions(categoryToMove: Category): void {
    this.transactionService.searchAndMoveTransactions(this.category.id, categoryToMove.id, this.lastTerm)
      .then(() => {
        this.resetSearchResults();
        this.getTransactions(this.category);
      })
  }

  resetSearchResults() {
    this.rows = this.rows.filter(row => this.selectedTransactionIds.indexOf(row.id) === -1);
    this.selectedTransactionIds = [];
    this.elSerchBox.nativeElement.value = '';
    this.search('');
  }

  showDrop() {
    if (this.isDropShown) {
      this.isDropShown = false;
    } else {
      this.isDropShown = true;
    }
  }

  show() {
    if (this.isShown) {
      this.isShown = false;
    } else {
      this.isShown = true;
    }
  }

  private setSTransactionPresented(value: boolean) {
    this.isTransactionsPresented = value
  }

  gotoChart(): void {
    this.router.navigate(['/charts'])
  }
}
