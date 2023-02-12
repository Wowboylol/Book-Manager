import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy
{
    private userSubscription: Subscription;
	public collapsed = true;
    public isAuthenticated = false;

    constructor(private dataStorage:DataStorageService, private authService:AuthService) { }

    ngOnInit() 
    { 
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    ngOnDestroy() { this.userSubscription.unsubscribe(); }

    public onSaveData() { this.dataStorage.storeBooks(); }

    public onFetchData() { this.dataStorage.fetchBooks().subscribe(); }

    public onLogout() { this.authService.logout(); }
}