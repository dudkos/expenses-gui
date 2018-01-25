import { Category } from '../category';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router'
import { Location}                  from '@angular/common'

import {CategoryService} from '../service/category.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css']
})

export class CategoryDetailComponent implements OnInit {
    @Input() category : Category;

    constructor(
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.categoryService.getCategory(+params['id']))
        .subscribe(category => this.category = category)
    }

    save(): void {
      this.categoryService.updateCategory(this.category)
        .then(() => this.goBack())
    }

    goBack(): void {
      this.location.back();
    }
}
