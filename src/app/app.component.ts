import { Router } from '@angular/router';
import { AuthenticationService } from './authorization/service/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My expenses';

  public constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
