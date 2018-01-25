import { User } from './../../users/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators} from "@angular/forms";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: User = new User();
    regForm: FormGroup;

    onSubmit() {
        console.log(this.user.email);
    }
}
