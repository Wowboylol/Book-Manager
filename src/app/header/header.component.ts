import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy
{
    // Attributes
    private userSubscription: Subscription;
	public collapsed = true;
    public isAuthenticated = false;

    // Alert attributes
    public timer = null;
    public success = false;
    public error = false;
    public message = "";

    // Methods
    constructor(private dataStorage:DataStorageService, private authService:AuthService) { }

    ngOnInit() 
    { 
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    ngOnDestroy() { this.userSubscription.unsubscribe(); }

    public onSaveData() 
    { 
        if(this.onCooldown() == false)
        {
            this.success = true;
            this.message = "Books saved successfully!";
            this.timer = setTimeout(() => { this.timer = null; this.success = false; this.error = false; }, 5000);
            this.dataStorage.storeBooks(); 
        }
    }

    public onFetchData() 
    { 
        if(this.onCooldown() == false)
        {
            this.success = true;
            this.message = "Books fetched successfully!";
            this.timer = setTimeout(() => { this.timer = null; this.success = false; this.error = false; }, 5000);
            this.dataStorage.fetchBooks().subscribe(); 
        }
    }

    private onCooldown(): boolean
    {
        if(this.timer) 
        {
            this.error = true;
            this.success = false;
            this.message = "Please wait 5 seconds before saving/fetching again!";
            return true;
        }
        return false;
    }

    public onLogout() { this.authService.logout(); }
}