import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit 
{
	private _tags = [];

	constructor() 
	{

	}

	ngOnInit(): void 
	{

	}

	// Getters
	public get tags() { return this._tags; }

}
