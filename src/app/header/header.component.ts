import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent
{
	public collapsed = true;

    public constructor(private dataStorage:DataStorageService) { }

    public onSaveData() { this.dataStorage.storeBooks(); }

    public onFetchData() { this.dataStorage.fetchBooks().subscribe(); }
}