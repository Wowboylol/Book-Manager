import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from 'src/app/tags/tags.service';
import { Book } from '../book.model';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit 
{
	@Input() selectedBook:Book;
	private _tagService:TagService;

	public constructor(tagService:TagService) 
	{
		this._tagService = tagService;
	}

	ngOnInit(): void {}

	public exportTags(tags:Tag[])
	{
		this._tagService.addMultipleTags(tags);
	}
}
