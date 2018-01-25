import { AuthenticationService } from './../authorization/service/authentication.service';
import { TransactionTableService } from './../transaction-table/service/transaction-table.service';
import { CategoryService } from './service/category.service';
import { Category } from './category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'my-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;

  constructor(private categoriesService: CategoryService, private transactionTableService: TransactionTableService, private router: Router) {
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCategory.id])
  }

  getCategories(): void {
    this.categoriesService.getCategories()
    .then(categories => {
      this.categories = categories
      this.onSelect(categories[0]);
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSelect(category : Category): void {
    this.selectedCategory = category;
    this.transactionTableService.selectCategory(category);
    this.transactionTableService.saveCategories(this.categories.filter(category => this.selectedCategory.id !== category.id));
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.categoriesService.create(name)
    .then(category => {
      this.categories.push(category);
      if(this.selectedCategory !== undefined) {
        this.transactionTableService.saveCategories(this.categories.filter(category => this.selectedCategory.id !== category.id));
      }
    })
  }

  delete(category: Category): void {
    this.categoriesService
    .delete(category.id)
    .then(() => {
      this.categories = this.categories.filter(h => h !== category);
      if(this.selectedCategory === category) {
        this.onSelect(this.categories[0]);
      } else {
        this.transactionTableService.saveCategories(this.categories);
      }
    })
  }
}

