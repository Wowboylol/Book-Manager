import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from '../tags.service';

@Component({
	selector: 'app-tag-edit',
	templateUrl: './tag-edit.component.html',
	styleUrls: ['./tag-edit.component.css']
})

export class TagEditComponent implements OnInit 
{
	private _tagService:TagService;
	private _tagExists:boolean;

	public constructor(tagService:TagService) 
	{
		this._tagService = tagService;
		this._tagExists = false;
	}

	ngOnInit(): void {}

	public get tagExists():boolean { return this._tagExists; }

	public onAddTag(form:NgForm)
	{
		const tagName = form.value.tagName;

		if(this._tagService.checkIfTagExists(tagName))
		{
			this._tagExists = true;
			return;
		}
		const newTag = new Tag(tagName, 0);
		this._tagService.addTag(newTag);
		this._tagExists = false;
		form.reset();
	}
}
