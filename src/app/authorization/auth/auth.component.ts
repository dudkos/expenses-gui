import { AlertService } from './../../alert/service/alert.service';
import { AuthenticationService } from './../service/authentication.service';
import { User } from './../../users/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    model: User = new User();
    loading = false;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) { }

    ngOnInit() {
       this.authenticationService.logout();
    }

    onSubmit() {
        this.loading = true;
        this.authenticationService.login(this.model.login, this.model.password)
            .subscribe(
                data => {
                   if(data === true) {
                      this.router.navigate(["/transactions"]);
                   } else {
                       this.loading = false;
                   }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
