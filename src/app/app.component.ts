import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent 
{
	private _currentPage:string;

	public constructor()
	{
		this._currentPage = "books";
	}

	// Getter and setters
	public get currentPage():string { return this._currentPage; }
	public set currentPage(selection:string) { this._currentPage = selection; }
}
