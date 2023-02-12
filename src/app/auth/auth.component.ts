import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent 
{
    public isLoginMode = true;
    public isLoading = false;
    public error:string = null;

    constructor(private authService: AuthService, private router: Router) { }

    public onSwitchMode() 
    { 
        this.isLoginMode = !this.isLoginMode;
    }

    public onSubmit(form: NgForm)
    {
        if(!form.valid) return;
        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;
        this.isLoading = true;

        if(this.isLoginMode) authObservable = this.authService.login(email, password);
        else authObservable = this.authService.signUp(email, password)

        authObservable.subscribe(
            res => {
                console.log(res);
                this.isLoading = false;
                this.router.navigate(['/books']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();
    }
}