import { Category } from './../../categories/category';
import {Injectable} from '@angular/core';
import { Subject }  from 'rxjs/Subject';

@Injectable()
export class TransactionTableService {

    private categorySource = new Subject<Category>();
    private categoriesSource = new Subject<Category[]>();

    category$ = this.categorySource.asObservable();
    categories$ = this.categoriesSource.asObservable();

    selectCategory(category: Category) {
        this.categorySource.next(category);
    }

    saveCategories(categories: Category[]) {
        this.categoriesSource.next(categories);
    }
}
