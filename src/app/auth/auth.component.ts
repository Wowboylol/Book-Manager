import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent 
{
    public isLoginMode = true;
    public isLoading = false;
    public error:string = null;

    constructor(private authService: AuthService) { }

    public onSwitchMode() 
    { 
        this.isLoginMode = !this.isLoginMode;
    }

    public onSubmit(form: NgForm)
    {
        if(!form.valid) return;
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if(this.isLoginMode)
        {
            // ...
        }
        else
        {
            this.authService.signUp(email, password).subscribe(
                res => {
                    console.log(res);
                    this.isLoading = false;
                }, 
                error => {
                    console.log(error);
                    this.error = "An error occurred!";
                    this.isLoading = false;
                }
            );
        }
        form.reset();
    }
}