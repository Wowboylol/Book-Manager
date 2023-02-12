import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { User } from "./user.model";

export interface AuthResponseData
{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService
{
    public user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    public signUp(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleUserData(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
            })
        );
    }

    public login(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleUserData(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
            })
        );
    }

    public logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleUserData(userId: string, email: string, token: string, expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(userId, email, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse)
    {
        let errorMessage = "An unknown error occurred!";
        if(!errorRes.error || !errorRes.error.error) return throwError(errorMessage);

        switch(errorRes.error.error.message){
            case "EMAIL_EXISTS":
                errorMessage = "This email exists already!";
                break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                errorMessage = "Too many unsuccessful attempts have been made, try again later!";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "This email does not exist!";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is incorrect!";
                break;
        }
        return throwError(errorMessage);
    }
}