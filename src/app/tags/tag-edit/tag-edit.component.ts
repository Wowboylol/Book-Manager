import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from '../tags.service';

@Component({
	selector: 'app-tag-edit',
	templateUrl: './tag-edit.component.html',
	styleUrls: ['./tag-edit.component.css']
})

export class TagEditComponent implements OnInit, OnDestroy 
{
	@ViewChild('tagForm') tagForm:NgForm;
	private _tagService:TagService;
	private subscription:Subscription;
	private _tagExists:boolean;
	private _editMode:boolean;
	private editedTagIndex:number;
	private editedTag:Tag;
	private _errorMsg:string = "Tag already exists!";

	public constructor(tagService:TagService) 
	{
		this._tagService = tagService;
		this._tagExists = false;
		this._editMode = false;
	}

	ngOnInit(): void 
	{
		this.subscription = this._tagService.startedEditing.subscribe((tagIndex:number) => 
		{
			this.editedTagIndex = tagIndex;
			this._editMode = true;
			this.editedTag = this._tagService.getTag(tagIndex);
			this.tagForm.setValue({tagName: this.editedTag.name});
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public get tagExists():boolean { return this._tagExists; }
	public get editMode():boolean { return this._editMode; }
	public get errorMsg():string { return this._errorMsg; }

	public onSubmit(form:NgForm)
	{
		const tagName = form.value.tagName;
		
		if(this._editMode)
		{
			this._tagExists = false;
			this._tagService.updateTag(this.editedTagIndex, tagName);
			this._editMode = false;
		}
		else
		{
			const newTag = new Tag(tagName, -1);
			if(this._tagService.checkIfTagExists(tagName))
			{
				this._tagExists = true;
				this._errorMsg = "Tag already exists!";
				return;
			}
			this._tagService.addTag(newTag);
			this._tagExists = false;
		}
		form.reset();
	}

	public onClear()
	{
		this.tagForm.reset();
		this._editMode = false;
		this._tagExists = false;
	}

	public onDelete()
	{
		if(this._tagService.deleteTag(this.editedTagIndex)) 
		{
			this.onClear();
			this._errorMsg = "Tag already exists!";
		}
		else
		{
			this._errorMsg = "You can only remove tags that do not already exist on a book!";
			this._tagExists = true;
		}
	}
}
