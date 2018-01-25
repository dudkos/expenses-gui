import { RequestService } from './../../util/request.service';
import { Injectable } from '@angular/core';
import { Category } from '../category';

@Injectable()
export class CategoryService {

    private categoriesUrl = 'expenses/categories';

    constructor(private requestService: RequestService) {
    }

    getCategories(): Promise<Category[]> {
        return this.requestService.get(this.categoriesUrl);
    }

    getCategory(id: number): Promise<Category> {
        return this.requestService.get(this.categoriesUrl+`/${id}`)
    }

    updateCategory(category: Category): Promise<Category> {
        return this.requestService.put(this.categoriesUrl+`/${category.id}`, JSON.stringify(category));
    }

    create(name: String): Promise<Category> {
        return this.requestService.put(this.categoriesUrl, JSON.stringify({name: name}))
    }

    delete(id: number): Promise<void> {
        return this.requestService.delete(this.categoriesUrl+`/${id}`)
    }
}
