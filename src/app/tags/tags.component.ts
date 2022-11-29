import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit 
{
	private _tags:Tag[];

	public constructor() 
	{
		this._tags = [new Tag("Tester", 2), new Tag("Testy", 4)];
	}

	ngOnInit(): void 
	{

	}

	// Getters
	public get tags():Tag[] { return this._tags; }
}
