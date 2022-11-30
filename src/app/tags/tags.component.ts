import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { TagService } from './tags.service';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit 
{
	private _tags:Tag[];
	private _tagService:TagService;

	public constructor(tagService:TagService) 
	{
		this._tagService = tagService;
	}

	ngOnInit(): void 
	{
		this._tags = this._tagService.getTags();
		this._tagService.tagChange.subscribe((tags:Tag[]) => {
			this._tags = tags;
		});
	}

	public get tags():Tag[] { return this._tags; }
}
